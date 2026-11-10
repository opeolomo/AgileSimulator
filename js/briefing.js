/* Mission briefing: synthesised ambient score, spoken read-out and typewriter text.
   Everything is generated in the browser (Web Audio + Web Speech) — no audio files. */
(function () {
  'use strict';
  const KEY = 'agileSim.sound';
  const synth = window.speechSynthesis || null;
  const AC = window.AudioContext || window.webkitAudioContext;
  let on = true;
  try { on = localStorage.getItem(KEY) !== 'off'; } catch (e) { /* storage unavailable */ }
  let session = 0;          // increments on every start/stop so stale callbacks do nothing
  let timer = null, music = null;
  if (synth) { try { synth.getVoices(); } catch (e) { /* voices load lazily in some browsers */ } }

  /* ── ambient score: a low detuned drone with sparse, echoing bell tones ── */
  function startMusic() {
    if (!AC) return null;
    let ctx;
    try { ctx = new AC(); } catch (e) { return null; }
    if (ctx.state === 'suspended' && ctx.resume) ctx.resume().catch(() => {});
    const t0 = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, t0);
    master.gain.exponentialRampToValueAtTime(0.5, t0 + 2.5);
    master.connect(ctx.destination);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass'; filter.frequency.value = 260; filter.Q.value = 6;
    const lfo = ctx.createOscillator(), lfoGain = ctx.createGain();
    lfo.frequency.value = 0.07; lfoGain.gain.value = 140;
    lfo.connect(lfoGain); lfoGain.connect(filter.frequency); lfo.start();
    const droneGain = ctx.createGain(); droneGain.gain.value = 0.16;
    filter.connect(droneGain); droneGain.connect(master);
    const nodes = [lfo];
    [[55, 'sawtooth', 1], [55.5, 'sawtooth', 1], [82.4, 'sine', 0.8], [27.5, 'sine', 1.2]].forEach(d => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = d[1]; o.frequency.value = d[0]; g.gain.value = d[2];
      o.connect(g); g.connect(filter); o.start(); nodes.push(o);
    });

    const delay = ctx.createDelay(1.5), fb = ctx.createGain(), wet = ctx.createGain();
    delay.delayTime.value = 0.46; fb.gain.value = 0.5; wet.gain.value = 0.6;
    delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(master);
    const bell = (freq, at, level) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(level, at + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, at + 2.6);
      o.connect(g); g.connect(master); g.connect(delay);
      o.start(at); o.stop(at + 2.8);
    };
    const NOTES = [220, 261.63, 311.13, 329.63, 415.3, 440, 622.25];   // A minor with a tritone for unease
    let last = -1;
    const pluck = () => {
      let i; do { i = Math.floor(Math.random() * NOTES.length); } while (i === last);
      last = i; bell(NOTES[i], ctx.currentTime + 0.05, 0.07);
    };
    const loop = setInterval(pluck, 2700);
    setTimeout(pluck, 900);

    return {
      sting() { const t = ctx.currentTime + 0.05; [110, 164.81, 220, 329.63].forEach((f, i) => bell(f, t + i * 0.09, 0.09)); },
      stop(fade) {
        clearInterval(loop);
        const t = ctx.currentTime;
        try { master.gain.cancelScheduledValues(t); master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), t); master.gain.exponentialRampToValueAtTime(0.0001, t + fade); } catch (e) { /* context closing */ }
        setTimeout(() => { nodes.forEach(n => { try { n.stop(); } catch (e) { /* already stopped */ } }); if (ctx.close) ctx.close().catch(() => {}); }, fade * 1000 + 150);
      }
    };
  }

  function pickVoice() {
    const voices = (synth.getVoices() || []).filter(v => /^en/i.test(v.lang));
    const prefer = [/Daniel/i, /UK English Male/i, /Ryan|George|Arthur/i, /en-GB/i, /Male/i];
    for (const re of prefer) { const v = voices.find(x => re.test(x.name) || re.test(x.lang)); if (v) return v; }
    return voices[0] || null;
  }

  function stop() {
    session++;
    clearInterval(timer); timer = null;
    if (synth) { try { synth.cancel(); } catch (e) { /* ignore */ } }
    if (music) { music.stop(0.4); music = null; }
  }

  /** start({ body, closing, bodyEl, closingEl, onDone }) — must be called from a user gesture for sound. */
  function start(o) {
    stop();
    const my = session;
    const bodyEl = document.querySelector(o.bodyEl), closeEl = document.querySelector(o.closingEl);
    if (!bodyEl || !closeEl) return;
    const body = (o.body || '').trim(), closing = o.closing, full = body + (body ? ' ' : '') + closing;
    const split = full.length - closing.length;
    const reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sentences = full.match(/[^.!?]+[.!?]+["'’”)]*\s*|[^.!?]+$/g) || [full];
    const starts = []; sentences.reduce((a, s) => { starts.push(a); return a + s.length; }, 0);

    let idx = 0, cap = full.length, speaking = false, done = false;
    const paint = () => {
      bodyEl.textContent = full.slice(0, Math.min(idx, split));
      closeEl.textContent = idx > split ? full.slice(split, idx) : '';
      bodyEl.classList.toggle('typing', idx < split && !done);
      closeEl.classList.toggle('typing', idx >= split && !done);
    };
    const finish = () => {
      if (done || my !== session) return;
      done = true; idx = full.length; clearInterval(timer); timer = null; paint();
      if (music) { const m = music; music = null; m.sting(); setTimeout(() => m.stop(3), 1200); }
      if (o.onDone) o.onDone();
    };

    if (on) music = startMusic();

    let useVoice = on && !!synth && typeof SpeechSynthesisUtterance !== 'undefined';
    if (useVoice) {
      const voice = pickVoice();
      cap = 0;
      let started = false;
      sentences.forEach((text, k) => {
        const u = new SpeechSynthesisUtterance(text.trim());
        if (voice) { u.voice = voice; u.lang = voice.lang; } else u.lang = 'en-GB';
        u.rate = 0.92; u.pitch = 0.75; u.volume = 1;
        u.onstart = () => { if (my !== session) return; started = true; speaking = true; idx = Math.max(idx, starts[k]); cap = starts[k] + text.length; };
        u.onboundary = e => { if (my === session && e.charIndex != null) idx = Math.max(idx, Math.min(cap, starts[k] + e.charIndex)); };
        const last = k === sentences.length - 1;
        u.onend = () => { if (my !== session) return; idx = Math.max(idx, starts[k] + text.length); if (last) finish(); };
        u.onerror = () => { if (my === session) { speaking = false; cap = full.length; } };
        try { synth.speak(u); } catch (e) { useVoice = false; }
      });
      // No voice available or speech blocked: fall back to silent typing.
      setTimeout(() => { if (my === session && !started) { try { synth.cancel(); } catch (e) { /* ignore */ } speaking = false; cap = full.length; } }, 2500);
    }
    if (reduced && !useVoice) { finish(); return; }
    if (reduced) { idx = full.length; cap = full.length; paint(); return; }

    paint();
    let carry = 0;
    timer = setInterval(() => {
      if (my !== session) return clearInterval(timer);
      carry += (speaking ? 15 : 42) * 0.03;           // characters per 30 ms tick
      const step = Math.floor(carry); carry -= step;
      idx = Math.min(cap, idx + step);
      paint();
      if (idx >= full.length && !speaking) finish();
    }, 30);
  }

  window.AS_BRIEF = {
    start, stop,
    get enabled() { return on; },
    toggle() { on = !on; try { localStorage.setItem(KEY, on ? 'on' : 'off'); } catch (e) { /* ignore */ } if (!on) stop(); return on; },
    supported: { voice: !!synth, music: !!AC }
  };
})();
