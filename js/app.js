/* Scaled Agile Simulator — application logic (no dependencies). */
(function () {
  'use strict';
  const G = window.AS_GFX, B = window.AS_BRIEF, esc = G.esc, DEF = window.AS_DEFAULTS;
  const KEY = { cfg: 'agileSim.config.v1', hist: 'agileSim.history.v1', ses: 'agileSim.session.v1', theme: 'agileSim.theme' };
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const clone = o => JSON.parse(JSON.stringify(o));
  const uid = p => p + '-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const byId = (list, id) => list.find(x => x.id === id);
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const store = {
    get(k, s) { try { return JSON.parse((s || localStorage).getItem(k)); } catch (e) { return null; } },
    set(k, v, s) { try { (s || localStorage).setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } }
  };

  let cfg = clone(DEF);
  let baseCfg = clone(DEF);       // built-in defaults, or config.json when the host provides one
  let customised = false;         // true when this browser holds admin edits
  let modal = null;
  let toastTimer = null;
  const fresh = () => ({ view: 'home', step: 0, profile: { team: '', portfolio: null, level: null, role: null, scenario: null }, run: null, admin: { authed: false, tab: 'portfolios', fScenario: '', fEvent: '' } });
  let S = fresh();
  const anim = { metrics: null, train: null, event: null };

  /* ───────────── config ───────────── */
  const LISTS = ['portfolios', 'levels', 'roles', 'events', 'scenarios', 'questions'];
  function normalise(c) {
    if (!c || typeof c !== 'object' || !LISTS.every(k => Array.isArray(c[k]))) return null;
    c = clone(c);
    if (!Array.isArray(c.metrics) || !c.metrics.length) c.metrics = clone(DEF.metrics);
    if (typeof c.adminPin !== 'string' || !c.adminPin) c.adminPin = DEF.adminPin;
    c.roles.forEach(r => { r.levels = r.levels || []; });
    c.events.forEach(e => { e.levels = e.levels || []; e.keyRoles = e.keyRoles || []; });
    c.questions.forEach(q => {
      q.levels = q.levels || []; q.roles = q.roles || []; q.type = q.type || 'single';
      q.options = (q.options || []).map(o => ({ text: o.text || '', feedback: o.feedback || '', impact: Object.assign({}, o.impact) }));
    });
    return c;
  }
  function saveCfg() {
    customised = true;
    if (!store.set(KEY.cfg, cfg)) toast('Could not save — browser storage is unavailable.');
  }

  /* ───────────── simulation model ───────────── */
  const P = () => S.profile;
  const sel = () => ({
    portfolio: byId(cfg.portfolios, P().portfolio), level: byId(cfg.levels, P().level),
    role: byId(cfg.roles, P().role), scenario: byId(cfg.scenarios, P().scenario)
  });
  const scenariosFor = pid => cfg.scenarios.filter(s => s.active !== false && (s.portfolio === '*' || s.portfolio === pid));
  function buildQueue(scenarioId, levelId, roleId) {
    const out = [];
    cfg.events.filter(e => e.levels.includes(levelId)).forEach(e => {
      cfg.questions.filter(q => q.event === e.id && (q.scenario === '*' || q.scenario === scenarioId) &&
        (!q.levels.length || q.levels.includes(levelId)) && (!q.roles.length || q.roles.includes(roleId))).forEach(q => out.push({ e: e.id, q: q.id }));
    });
    return out;
  }
  /* Run length: a shorter run samples questions evenly across the events, mixing
     role, mission and shared questions, and picks a different sample each time. */
  const LENGTHS = [
    { id: 'short', name: 'Short', target: 10 },
    { id: 'standard', name: 'Standard', target: 16 },
    { id: 'full', name: 'Full', target: Infinity }
  ];
  const lengthOf = () => byId(LENGTHS, P().length) || byId(LENGTHS, cfg.runLength) || LENGTHS[2];
  const runSize = (pool, len) => Math.min(pool.length, Math.max(len.target, new Set(pool.map(x => x.e)).size));
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function sampleQueue(pool, len) {
    const size = runSize(pool, len);
    if (size >= pool.length) return pool;
    const events = []; const by = {};
    pool.forEach((x, i) => {
      if (!by[x.e]) { by[x.e] = [[], [], []]; events.push(x.e); }
      const q = byId(cfg.questions, x.q);
      by[x.e][q.roles.length ? 0 : q.scenario !== '*' ? 1 : 2].push(i);     // role, mission, shared
    });
    const lines = events.map(e => {
      const groups = shuffle(by[e].map(shuffle)), line = [];
      for (let k = 0; groups.some(g => g.length > k); k++) groups.forEach(g => { if (g.length > k) line.push(g[k]); });
      return line;
    });
    const chosen = [];
    for (let k = 0; chosen.length < size; k++) for (const line of lines) { if (line.length > k && chosen.length < size) chosen.push(line[k]); }
    return chosen.sort((a, b) => a - b).map(i => pool[i]);
  }
  function fill(text) {
    const s = sel();
    return esc(text)
      .replace(/\{client\}/g, esc(s.scenario ? s.scenario.client || 'the client' : 'the client'))
      .replace(/\{initiative\}/g, esc(s.scenario ? s.scenario.initiative || s.scenario.title : 'the initiative'))
      .replace(/\{portfolio\}/g, esc(s.portfolio ? s.portfolio.name : 'your'));
  }
  const total = imp => cfg.metrics.reduce((a, m) => a + (+imp[m.id] || 0), 0);
  const bestIndex = q => q.options.reduce((b, o, i) => (total(o.impact) > total(q.options[b].impact) ? i : b), 0);
  function isCorrect(q, picks) {
    if (q.type !== 'multi') return picks.length === 1 && picks[0] === bestIndex(q);
    const good = q.options.map((o, i) => (total(o.impact) > 0 ? i : -1)).filter(i => i >= 0);
    return good.length === picks.length && good.every(i => picks.includes(i));
  }
  function startRun() {
    const queue = sampleQueue(buildQueue(P().scenario, P().level, P().role), lengthOf());
    if (!queue.length) return toast('No questions are configured for this combination yet.');
    const metrics = {}; cfg.metrics.forEach(m => { metrics[m.id] = 50; });
    // Shuffle the answer order for every question, afresh on each run.
    queue.forEach(item => {
      const order = (byId(cfg.questions, item.q).options || []).map((_, i) => i);
      for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
      item.o = order;
    });
    S.run = { queue, idx: 0, metrics, answers: [], revealed: false, saved: false };
    anim.metrics = null; anim.train = null; anim.event = null;
    go('play');
  }
  function confirmAnswer() {
    const run = S.run, item = run.queue[run.idx], q = byId(cfg.questions, item.q);
    const ans = { q: q.id, e: item.e, delta: {}, picks: [], text: '' };
    cfg.metrics.forEach(m => { ans.delta[m.id] = 0; });
    if (q.type === 'text') {
      ans.text = ($('#q-text') || { value: '' }).value.trim();
    } else {
      ans.picks = $$('.opt.on').map(el => +el.dataset.i);
      if (!ans.picks.length) return;
      // A first answer that is not the recommended one earns a second attempt.
      if (!run.retry && !isCorrect(q, ans.picks)) { run.retry = { picks: ans.picks }; B.sfx('retry'); return render(); }
      if (run.retry) { ans.first = run.retry.picks; ans.attempts = 2; run.retry = null; }
      B.sfx(!isCorrect(q, ans.picks) ? 'wrong' : ans.attempts === 2 ? 'partial' : 'right');
      ans.picks.forEach(i => cfg.metrics.forEach(m => { ans.delta[m.id] += +q.options[i].impact[m.id] || 0; }));
      if (ans.attempts === 2) cfg.metrics.forEach(m => { if (ans.delta[m.id] > 0) ans.delta[m.id] = Math.round(ans.delta[m.id] / 2); });
      cfg.metrics.forEach(m => { ans.delta[m.id] = clamp(ans.delta[m.id], -20, 20); });
    }
    anim.metrics = Object.assign({}, run.metrics);
    cfg.metrics.forEach(m => { run.metrics[m.id] = clamp(run.metrics[m.id] + ans.delta[m.id], 0, 100); });
    run.answers.push(ans); run.revealed = true;
    render();
  }
  function nextQuestion() {
    const run = S.run;
    run.revealed = false; run.retry = null; run.idx++;
    anim.metrics = null;
    if (run.idx >= run.queue.length) { saveHistory(); go('debrief'); } else render(true);
  }
  const overall = metrics => Math.round(cfg.metrics.reduce((a, m) => a + metrics[m.id], 0) / cfg.metrics.length);
  function saveHistory() {
    if (S.run.saved) return;
    const s = sel(), hist = store.get(KEY.hist) || [];
    hist.unshift({ at: new Date().toISOString(), team: P().team, portfolio: s.portfolio.name, level: s.level.name, role: s.role.name, scenario: s.scenario.title, score: overall(S.run.metrics), metrics: Object.assign({}, S.run.metrics) });
    store.set(KEY.hist, hist.slice(0, 200));
    S.run.saved = true;
  }

  /* ───────────── rendering helpers ───────────── */
  function go(view, step) {
    S.view = view; if (step != null) S.step = step;
    render(true);
  }
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
  }
  function header() {
    return `<header class="top">
      <button class="brand" data-act="home" aria-label="Home">${G.train()}<span><b>Agile Simulator</b><small>Corporate Banking</small></span></button>
      <nav>
        ${S.view !== 'home' ? '<button class="ghost" data-act="home">Home</button>' : ''}
        <button class="ghost" data-act="admin">Admin</button>
        <button class="ghost" data-act="brief-sound" aria-pressed="${B.enabled}" aria-label="Turn sound ${B.enabled ? 'off' : 'on'}">Sound ${B.enabled ? 'on' : 'off'}</button>
        <button class="ghost" data-act="theme" aria-label="Switch between light and dark theme">Theme</button>
      </nav></header>`;
  }
  const chip = (label, value) => `<span class="chip"><small>${esc(label)}</small>${esc(value)}</span>`;

  /* ───────────── home ───────────── */
  function vHome() {
    const hist = store.get(KEY.hist) || [];
    return `<section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Scaled agile · Corporate banking</p>
        <h1>Run a Planning Interval before you run a real one.</h1>
        <p class="lede">Choose your portfolio, your level and your role. Then steer a client scenario through each agile event and watch how your decisions move client value, flow, risk and team health.</p>
        <div class="row"><button class="primary big" data-act="begin">Start a simulation</button>
        ${S.run && S.run.idx < S.run.queue.length ? '<button class="ghost big" data-act="resume">Resume current run</button>' : ''}</div>
      </div>
      <div class="hero-art">${G.hero()}</div>
    </section>
    <section class="steps3">
      <article><span class="stepnum">1</span><h3>Set the scene</h3><p>Pick one of ${cfg.portfolios.filter(p => p.active !== false).length} portfolios, where you sit — from Team to ExCo — and the role you play.</p></article>
      <article><span class="stepnum">2</span><h3>Plan through the events</h3><p>Board the train. Each station is an agile event with decisions to make as a team, questionnaire style.</p></article>
      <article><span class="stepnum">3</span><h3>Debrief together</h3><p>See your scores, the reasoning behind every option and a decision log you can print for the retrospective.</p></article>
    </section>
    ${hist.length ? `<section class="card"><h3>Recent runs on this device</h3><div class="table-wrap"><table><thead><tr><th>When</th><th>Team</th><th>Portfolio</th><th>Level / role</th><th>Scenario</th><th class="num">Score</th></tr></thead><tbody>
      ${hist.slice(0, 5).map(h => `<tr><td>${esc(new Date(h.at).toLocaleDateString())}</td><td>${esc(h.team || '—')}</td><td>${esc(h.portfolio)}</td><td>${esc(h.level)} · ${esc(h.role)}</td><td>${esc(h.scenario)}</td><td class="num">${h.score}</td></tr>`).join('')}
      </tbody></table></div></section>` : ''}
    <p class="fine">An independent learning aid. Terminology follows common scaled-agile practice; clients and scenarios are fictional.</p>`;
  }

  /* ───────────── setup wizard ───────────── */
  const STEPS = ['Portfolio', 'Level', 'Role', 'Scenario'];
  const ACCEPT = 'If you wish to accept this mission, click on Board the train.';
  const onBriefing = () => S.view === 'setup' && S.step === 3 && !!sel().scenario;
  function playBrief() {
    if (!onBriefing()) return;
    const btn = $('[data-act="start"]'); if (btn) btn.classList.remove('ready');
    B.start({ body: sel().scenario.brief || '', closing: ACCEPT, bodyEl: '#brief-text', closingEl: '#brief-accept',
      onDone() { const b = $('[data-act="start"]'); if (b && !b.disabled) b.classList.add('ready'); } });
  }
  function vSetup() {
    const s = sel(), step = S.step;
    const done = [!!s.portfolio, !!s.level, !!s.role, !!s.scenario];
    let body = '';
    if (step === 0) {
      const list = cfg.portfolios.filter(p => p.active !== false);
      body = `<h2>Which portfolio do you belong to?</h2>
        <label class="field inline"><span>Team or session name <em>(optional)</em></span><input type="text" data-bind="team" maxlength="60" value="${esc(P().team)}" placeholder="e.g. Payments Train — Team Falcon"></label>
        <div class="grid cards">${list.map(p => `<button class="pick ${p.id === P().portfolio ? 'on' : ''}" data-act="set-portfolio" data-id="${esc(p.id)}">
          <span class="pick-ico">${G.icon(p.icon, 28)}</span><b>${esc(p.name)}</b><small>${esc(p.blurb || '')}</small></button>`).join('') || '<p class="empty">No portfolios are available. Ask your admin to add one.</p>'}</div>`;
    } else if (step === 1) {
      const lv = cfg.levels.slice().reverse(), n = lv.length;
      body = `<h2>Where do you sit in the work breakdown?</h2><p class="sub">Strategy flows down; value and feedback flow up. Pick the level you work at, or use Learn more to see what each one is about.</p>
        <div class="pyramid">${lv.map((l, i) => `<div class="tier ${l.id === P().level ? 'on' : ''}" style="--w:${n > 1 ? 46 + (54 * i) / (n - 1) : 100}%"><button class="tier-main" data-act="set-level" data-id="${esc(l.id)}">
          <b>${esc(l.name)}</b><span>${esc(l.alias || '')}</span><small>${esc(l.blurb || '')}</small></button>
          <button class="mini more" data-act="learn" data-kind="levels" data-id="${esc(l.id)}" aria-label="Learn more about ${esc(l.name)}">Learn more</button></div>`).join('')}</div>`;
    } else if (step === 2) {
      const roles = cfg.roles.filter(r => r.levels.includes(P().level));
      body = `<h2>What is your role at ${esc(s.level ? s.level.name : '')} level?</h2><p class="sub">Not sure? Learn more shows what each role does and which events it attends.</p>
        <div class="grid cards">${roles.map(r => `<div class="pick ${r.id === P().role ? 'on' : ''}"><button class="pick-main" data-act="set-role" data-id="${esc(r.id)}">
          <span class="pick-ico round">${esc((r.short || r.name).split(/\s+/).map(w => w[0]).join('').slice(0, 3).toUpperCase())}</span><b>${esc(r.name)}</b><small>${esc(r.blurb || '')}</small></button>
          <button class="mini more" data-act="learn" data-kind="roles" data-id="${esc(r.id)}" aria-label="Learn more about ${esc(r.name)}">Learn more</button></div>`).join('') || '<p class="empty">No roles are configured for this level yet.</p>'}</div>`;
    } else {
      const list = scenariosFor(P().portfolio);
      const queue = s.scenario ? buildQueue(s.scenario.id, P().level, P().role) : [];
      const evs = cfg.events.filter(e => queue.some(x => x.e === e.id));
      body = `<h2>Choose your scenario</h2>
        <div class="grid cards two">${list.map(sc => `<button class="pick ${sc.id === P().scenario ? 'on' : ''}" data-act="set-scenario" data-id="${esc(sc.id)}">
          <b>${esc(sc.title)}</b><small>${esc(sc.client || '')}${sc.initiative ? ' · ' + esc(sc.initiative) : ''}</small></button>`).join('') || '<p class="empty">No scenarios are available for this portfolio yet. An admin can add one.</p>'}</div>
        ${s.scenario ? `<div class="brief card">
          <p class="eyebrow">Mission briefing</p><h3>${esc(s.scenario.title)}</h3>
          <div class="row wrap">${chip('Client', s.scenario.client || '—')}${chip('Initiative', s.scenario.initiative || '—')}${chip('You are', s.role.name)}${chip('Level', s.level.name)}</div>
          <p id="brief-text" class="brief-text">${esc(s.scenario.brief || '')}</p>
          <p id="brief-accept" class="accept">${ACCEPT}</p>
          <div class="row wrap brief-ctl"><button class="mini" data-act="brief-play">▶ Replay briefing</button>
            <button class="mini" data-act="brief-sound" aria-pressed="${B.enabled}">Sound: ${B.enabled ? 'on' : 'off'}</button></div>
          <div class="row wrap runlen"><span>Run length</span>${LENGTHS.map(l => `<button class="mini ${l.id === lengthOf().id ? 'on' : ''}" data-act="set-length" data-id="${l.id}" data-n="${runSize(queue, l)}" aria-pressed="${l.id === lengthOf().id}">${l.name} · ${runSize(queue, l)}</button>`).join('')}</div>
          <h4>Your itinerary — ${evs.length} events, <span id="run-n">${runSize(queue, lengthOf())}</span> decisions</h4>
          <ol class="itinerary">${evs.map(e => `<li><b>${esc(e.name)}</b><small>${esc(e.cadence || '')}</small></li>`).join('')}</ol>
          <button class="primary big" data-act="start" ${queue.length ? '' : 'disabled'}>Board the train</button>
          ${queue.length ? '' : '<p class="empty">No questions are configured for this level and scenario.</p>'}
        </div>` : ''}`;
    }
    return `<section class="wizard">
      <ol class="stepper">${STEPS.map((t, i) => `<li class="${i === step ? 'cur' : ''} ${done[i] ? 'done' : ''}"><button data-act="step" data-id="${i}" ${i === 0 || done[i - 1] ? '' : 'disabled'}><i>${i + 1}</i>${t}</button></li>`).join('')}</ol>
      ${body}
      <div class="row between"><button class="ghost" data-act="${step ? 'step' : 'home'}" data-id="${step - 1}">Back</button>
      ${step < 3 ? `<button class="primary" data-act="step" data-id="${step + 1}" ${done[step] ? '' : 'disabled'}>Next</button>` : ''}</div>
    </section>`;
  }

  /* ───────────── play ───────────── */
  function meters(metrics, from, delta) {
    return `<div class="meters">${cfg.metrics.map(m => {
      const v = metrics[m.id], f = from ? from[m.id] : v, d = delta ? delta[m.id] : 0;
      return `<div class="meter" title="${esc(m.hint || '')}"><div class="meter-head"><span>${esc(m.name)}</span><b>${v}${d ? `<i class="${d > 0 ? 'up' : 'down'}">${d > 0 ? '▲ +' : '▼ −'}${Math.abs(d)}</i>` : ''}</b></div>
        <div class="bar" role="meter" aria-label="${esc(m.name)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${v}"><span style="width:${f}%" data-w="${v}"></span></div></div>`;
    }).join('')}</div>`;
  }
  function roomPeople(ev) {
    const me = P().role;
    let ids = ev.keyRoles.filter(id => byId(cfg.roles, id));
    if (!ids.includes(me)) { ids = ids.slice(0, 5); ids.splice(Math.ceil(ids.length / 2), 0, me); } else ids = ids.slice(0, 7);
    if (ids.length > 6 && !ids.slice(0, 6).includes(me)) ids[5] = me;
    return ids.slice(0, 6).map(id => { const r = byId(cfg.roles, id); return { label: r.short || r.name, you: id === me, seed: cfg.roles.indexOf(r) }; });
  }
  function vPlay() {
    const run = S.run, s = sel();
    if (!run || !s.scenario || run.idx >= run.queue.length) return vHome();
    const item = run.queue[run.idx], ev = byId(cfg.events, item.e), q = byId(cfg.questions, item.q);
    if (!ev || !q) { S.run = null; return vHome(); }      // content changed under a running session
    const stations = cfg.events.filter(e => run.queue.some(x => x.e === e.id));
    const si = stations.indexOf(ev);
    const ans = run.revealed ? run.answers[run.answers.length - 1] : null;
    const inEvent = run.queue.filter(x => x.e === ev.id), qi = inEvent.findIndex(x => x.q === q.id);
    const pos = ((si + 0.5) / stations.length) * 100;
    const trainFrom = anim.train == null ? pos : anim.train; anim.train = pos;
    const still = anim.event === ev.id; anim.event = ev.id;
    const amKey = ev.keyRoles.includes(P().role);

    let body;
    if (q.type === 'text') {
      body = ans ? `<div class="fb neutral"><b>Captured in your plan</b><p>${ans.text ? esc(ans.text) : '<em>Skipped.</em>'}</p></div>`
        : `<textarea id="q-text" rows="4" maxlength="600" placeholder="Type your answer as a team…"></textarea>`;
    } else {
      const best = bestIndex(q), multi = q.type === 'multi';
      const order = item.o && item.o.length === q.options.length ? item.o : q.options.map((_, i) => i);
      const retry = !ans && run.retry ? run.retry.picks : null;
      const first = ans && ans.first ? ans.first : [];
      body = `<div class="opts ${ans ? 'locked' : ''}" role="${multi ? 'group' : 'radiogroup'}">${order.map((i, pos) => {
        const o = q.options[i];
        const on = ans && ans.picks.includes(i), good = ans && (multi ? total(o.impact) > 0 : i === best);
        const struck = !multi && retry && retry.includes(i);
        const tag = ans && good ? '<em class="tag">Recommended practice</em>' : ans && on ? '<em class="tag you">Your choice</em>'
          : struck || (ans && first.includes(i)) ? '<em class="tag you">Your first choice</em>' : '';
        return `<button class="opt ${on ? 'on' : ''} ${ans && good ? 'best' : ''} ${struck ? 'wrong' : ''}" data-act="pick" data-i="${i}" data-multi="${multi ? 1 : ''}" ${ans || struck ? 'disabled' : ''} role="${multi ? 'checkbox' : 'radio'}" aria-checked="${on ? 'true' : 'false'}">
          <i class="mark">${String.fromCharCode(65 + pos)}</i><span>${fill(o.text)}${tag}</span></button>`;
      }).join('')}</div>`;
      if (retry) {
        let why;
        if (multi) {
          const bad = retry.filter(i => total(q.options[i].impact) <= 0);
          const missed = q.options.some((o, i) => total(o.impact) > 0 && !retry.includes(i));
          why = bad.map(i => `<p><b>${fill(q.options[i].text)}:</b> ${fill(q.options[i].feedback)}</p>`).join('')
            + (missed ? '<p>You also left out at least one practice that belongs here.</p>' : '');
        } else why = `<p>${fill(q.options[retry[0]].feedback)}</p>`;
        body += `<div class="fb mixed" tabindex="-1" id="fb"><b>↺ Not the strongest option — you have one more attempt</b>${why}<p class="fine">A second attempt earns half credit.</p></div>`;
      }
      if (ans) {
        const t = total(ans.delta), right = isCorrect(q, ans.picks), second = ans.attempts === 2;
        const cls = right ? 'good' : t >= 0 ? 'mixed' : 'bad';
        const verdict = right ? (second ? '✓ Got there on the second attempt' : '✓ Strong call') : t >= 0 ? '◐ Workable, with trade-offs' : '✕ Costly choice';
        const picked = ans.picks.map(i => `<p>${multi ? '<b>' + fill(q.options[i].text) + ':</b> ' : ''}${fill(q.options[i].feedback)}</p>`).join('');
        const better = !multi && !right ? `<p class="better"><b>Stronger play — ${fill(q.options[best].text)}.</b> ${fill(q.options[best].feedback)}</p>` : '';
        body += `<div class="fb ${cls}" tabindex="-1" id="fb"><b>${verdict}</b>${picked}${better}${second ? '<p class="fine">Second attempt: positive impact is halved.</p>' : ''}</div>`;
      }
    }
    const last = run.idx === run.queue.length - 1;
    return `<section class="play">
      <div class="hud card">
        <div class="row wrap">${chip('Portfolio', s.portfolio.name)}${chip('Role', s.role.name)}${chip('Client', s.scenario.client || s.scenario.title)}</div>
        ${meters(run.metrics, anim.metrics, ans && ans.delta)}
      </div>
      <div class="track" aria-label="Journey through the events">
        <div class="rail"></div>
        <div class="loco" style="left:${trainFrom}%" data-left="${pos}">${G.train()}</div>
        <ol>${stations.map((e, i) => `<li class="${i < si ? 'past' : i === si ? 'cur' : ''}"><i></i><span>${esc(e.name)}</span></li>`).join('')}</ol>
      </div>
      <div class="stage">
        <article class="room card ${still ? 'still' : ''}">
          ${G.scene(ev.scene, { people: roomPeople(ev), progress: run.idx / run.queue.length, title: ev.name })}
          <div class="room-info">
            <p class="eyebrow">Station ${si + 1} of ${stations.length} · ${esc(ev.cadence || '')}</p>
            <h2>${esc(ev.name)}</h2><p>${esc(ev.purpose || '')}</p>
            <p class="you-note">${amKey ? `As <b>${esc(s.role.name)}</b> you are a key participant here.` : `As <b>${esc(s.role.name)}</b> you join this event to contribute and stay aligned.`} ${esc(s.role.blurb || '')}</p>
          </div>
        </article>
        <article class="qcard card">
          <p class="eyebrow">Decision ${run.idx + 1} of ${run.queue.length}${inEvent.length > 1 ? ` · ${qi + 1}/${inEvent.length} in this event` : ''}${q.type === 'multi' ? ' · select all that apply' : ''}</p>
          ${q.roles.length ? `<p class="role-tag">For you as ${esc(s.role.name)}</p>` : ''}
          <h3 class="prompt">${fill(q.prompt)}</h3>
          ${body}
          <div class="row between">
            <button class="ghost" data-act="quit">Leave run</button>
            ${ans ? `<button class="primary" data-act="next" id="next">${last ? 'See the debrief' : 'Continue'}</button>`
              : `<button class="primary" data-act="confirm" id="confirm" ${q.type === 'text' ? '' : 'disabled'}>${q.type === 'text' ? 'Save answer' : run.retry ? 'Lock in second attempt' : 'Lock in decision'}</button>`}
          </div>
        </article>
      </div>
    </section>`;
  }

  /* ───────────── debrief ───────────── */
  const TIPS = {
    v: 'Keep real client users in your demos and treat every big initiative as a hypothesis to test with the smallest useful increment.',
    f: 'Plan to real capacity, limit work in process and make dependencies visible early — predictability comes from finishing, not starting.',
    r: 'Bring risk, compliance and operations into planning as partners and build controls into the pipeline rather than around it.',
    m: 'Honour the confidence vote, treat misses as system problems, and give improvement work real capacity.'
  };
  function vDebrief() {
    const run = S.run, s = sel();
    if (!run || !s.scenario) return vHome();
    const score = overall(run.metrics);
    const tier = score >= 72 ? ['High-performing train', `${s.scenario.client} is seeing value early and often, and your stakeholders trust your plans.`]
      : score >= 58 ? ['On track', `You are delivering for ${s.scenario.client}, with a few habits that will cost you at scale. See the decision log.`]
      : score >= 45 ? ['Wobbling on the rails', `Delivery is happening, but trade-offs are hurting. ${s.scenario.client} is starting to notice.`]
      : ['Off the rails', `The train is in trouble and ${s.scenario.client} is taking calls from competitors. The good news: every one of these is fixable.`];
    const sorted = cfg.metrics.slice().sort((a, b) => run.metrics[b.id] - run.metrics[a.id]);
    const hi = sorted[0], lo = sorted[sorted.length - 1];
    const C = 2 * Math.PI * 52;
    const events = cfg.events.filter(e => run.answers.some(a => a.e === e.id));
    const log = events.map(e => `<div class="log-ev"><h4>${esc(e.name)}</h4>${run.answers.filter(a => a.e === e.id).map(a => {
      const q = byId(cfg.questions, a.q); if (!q) return '';
      if (q.type === 'text') return `<div class="log-q"><p class="lq">${fill(q.prompt)}</p><p class="la note">${a.text ? esc(a.text) : '<em>Skipped</em>'}</p></div>`;
      const t = total(a.delta), cls = t >= 10 ? 'good' : t >= 0 ? 'mixed' : 'bad';
      return `<div class="log-q"><p class="lq">${fill(q.prompt)}</p>
        <p class="la ${cls}"><b>${t >= 10 ? '✓' : t >= 0 ? '◐' : '✕'}</b> ${a.picks.map(i => q.options[i] ? fill(q.options[i].text) : '').join('; ')}${a.attempts === 2 ? ' <em>(second attempt)</em>' : ''}
        <span class="deltas">${cfg.metrics.filter(m => a.delta[m.id]).map(m => `${esc(m.name)} ${a.delta[m.id] > 0 ? '+' : '−'}${Math.abs(a.delta[m.id])}`).join(' · ')}</span></p></div>`;
    }).join('')}</div>`).join('');
    const strong = run.answers.filter(a => { const q = byId(cfg.questions, a.q); return q && a.picks.length && a.attempts !== 2 && isCorrect(q, a.picks); }).length;
    const scored = run.answers.filter(a => a.picks.length).length;
    return `<section class="debrief">
      <div class="card result">
        <svg class="ring" viewBox="0 0 120 120" role="img" aria-label="Overall score ${score} out of 100">
          <circle cx="60" cy="60" r="52" fill="none" stroke="var(--line)" stroke-width="8"/>
          <circle cx="60" cy="60" r="52" fill="none" stroke="var(--accent)" stroke-width="8" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - score / 100)}" transform="rotate(-90 60 60)"/>
          <text x="60" y="64" text-anchor="middle" font-size="30" font-weight="700" fill="currentColor">${score}</text><text x="60" y="82" text-anchor="middle" font-size="10" fill="var(--muted)">out of 100</text>
        </svg>
        <div><p class="eyebrow">Debrief · ${esc(s.scenario.title)}${P().team ? ' · ' + esc(P().team) : ''}</p>
          <h1>${tier[0]}</h1><p class="lede">${esc(tier[1])}</p>
          <div class="row wrap">${chip('Portfolio', s.portfolio.name)}${chip('Level', s.level.name)}${chip('Role', s.role.name)}${chip('Right first time', strong + ' of ' + scored)}</div></div>
      </div>
      <div class="card"><h3>Where you finished <small>(every measure starts at 50)</small></h3>${meters(run.metrics)}
        <div class="grid two insights">
          <div><p class="eyebrow">Your strength</p><p><b>${esc(hi.name)}.</b> ${esc(hi.hint || '')} Your decisions consistently protected this.</p></div>
          <div><p class="eyebrow">Your growth edge</p><p><b>${esc(lo.name)}.</b> ${esc(TIPS[lo.id] || 'Review the decisions below that pulled this measure down and discuss what you would do differently.')}</p></div>
        </div></div>
      <div class="card"><h3>Your plan and decision log</h3>${log}</div>
      <div class="card"><h3>Questions for your team retrospective</h3><ul class="qs">
        <li>Which of these situations have we actually faced in ${esc(s.portfolio.name)}? What did we do?</li>
        <li>Where did we disagree during the simulation — and what does that tell us about our working agreements?</li>
        <li>What is one change we could make before our next ${P().level === 'team' ? 'iteration' : 'Planning Interval'}?</li></ul></div>
      <div class="row wrap no-print"><button class="primary" data-act="print">Print / save as PDF</button><button class="ghost" data-act="replay">Replay this scenario</button><button class="ghost" data-act="begin">Try another role or portfolio</button></div>
    </section>`;
  }

  /* ───────────── admin ───────────── */
  const optAll = (list, label, allLabel) => () => (allLabel ? [['*', allLabel]] : []).concat(list().map(x => [x.id, x[label]]));
  const SCHEMA = {
    portfolios: { title: 'Portfolios', one: 'portfolio', prefix: 'pf', help: 'Portfolio teams users can pick at the start. Untick "Available" to hide one without deleting it.',
      cols: [['name', 'Name'], ['blurb', 'Description'], ['active', 'Available']],
      fields: [{ k: 'name', l: 'Name', req: 1 }, { k: 'blurb', l: 'Description', t: 'textarea' }, { k: 'icon', l: 'Icon', t: 'select', opts: () => G.iconNames.map(n => [n, n]) }, { k: 'active', l: 'Available for selection', t: 'bool', def: true }] },
    scenarios: { title: 'Scenarios', one: 'scenario', prefix: 'sc', help: 'A scenario is the client situation teams plan against. Questions marked "All scenarios" are added automatically; add scenario-specific questions on the Questions tab.',
      cols: [['title', 'Title'], ['portfolio', 'Portfolio'], ['client', 'Client'], ['active', 'Available']],
      fields: [{ k: 'title', l: 'Title', req: 1 }, { k: 'portfolio', l: 'Portfolio', t: 'select', opts: optAll(() => cfg.portfolios, 'name', 'All portfolios'), def: '*' }, { k: 'client', l: 'Client name (fills {client})' }, { k: 'initiative', l: 'Initiative name (fills {initiative})' }, { k: 'brief', l: 'Mission briefing', t: 'textarea' }, { k: 'active', l: 'Available for selection', t: 'bool', def: true }] },
    roles: { title: 'Roles', one: 'role', prefix: 'rl', help: 'Agile roles, and the levels at which each can be selected.',
      cols: [['name', 'Name'], ['levels', 'Levels']],
      fields: [{ k: 'name', l: 'Name', req: 1 }, { k: 'short', l: 'Short label (shown under avatars)' }, { k: 'levels', l: 'Selectable at levels', t: 'multi', opts: optAll(() => cfg.levels, 'name') }, { k: 'blurb', l: 'Description', t: 'textarea' }, { k: 'more', l: '"Learn more" text — one point per line', t: 'textarea' }] },
    levels: { title: 'Levels', one: 'level', prefix: 'lv', help: 'The work breakdown, listed from the ground up (first = bottom of the pyramid). A new level needs roles and events assigned to it.',
      cols: [['name', 'Name'], ['alias', 'Also known as']],
      fields: [{ k: 'name', l: 'Name', req: 1 }, { k: 'alias', l: 'Also known as' }, { k: 'blurb', l: 'Description', t: 'textarea' }, { k: 'more', l: '"Learn more" text — one point per line', t: 'textarea' }] },
    events: { title: 'Events', one: 'event', prefix: 'ev', help: 'Agile events in the order they occur across a Planning Interval. A user meets every event that includes their level and has at least one question.',
      cols: [['name', 'Name'], ['levels', 'Levels'], ['cadence', 'Cadence']],
      fields: [{ k: 'name', l: 'Name', req: 1 }, { k: 'cadence', l: 'Cadence' }, { k: 'purpose', l: 'Purpose', t: 'textarea' }, { k: 'levels', l: 'Levels that attend', t: 'multi', opts: optAll(() => cfg.levels, 'name') }, { k: 'keyRoles', l: 'Key roles in the room', t: 'multi', opts: optAll(() => cfg.roles, 'name') }, { k: 'scene', l: 'Illustration', t: 'select', opts: () => G.sceneNames.map(n => [n, n]), def: 'board' }] }
  };
  const TABS = ['portfolios', 'scenarios', 'questions', 'roles', 'levels', 'events', 'settings'];
  const nameOf = (list, id, key, all) => id === '*' ? all : (byId(list, id) || {})[key] || '—';
  function cell(type, k, row) {
    const v = row[k];
    if (typeof v === 'boolean' || k === 'active') return v !== false ? 'Yes' : 'No';
    if (k === 'levels') return (v || []).map(id => esc(nameOf(cfg.levels, id, 'name'))).join(', ') || '—';
    if (k === 'portfolio') return esc(nameOf(cfg.portfolios, v, 'name', 'All portfolios'));
    return esc(v || '');
  }
  function vAdmin() {
    const A = S.admin;
    if (!A.authed) return `<section class="card narrow"><h2>Admin sign-in</h2>
      <p class="sub">Enter the admin PIN to manage portfolios, scenarios and questions.</p>
      <form data-form="pin"><label class="field"><span>Admin PIN</span><input type="password" name="pin" autocomplete="off" autofocus required></label>
      <div class="row between"><button type="button" class="ghost" data-act="home">Cancel</button><button class="primary">Sign in</button></div></form>
      <p class="fine">The default PIN is <code>agile</code> — change it under Settings. The PIN keeps casual users out; it is not a security control.</p></section>`;
    let body;
    if (A.tab === 'settings') body = adminSettings();
    else if (A.tab === 'questions') body = adminQuestions();
    else {
      const sc = SCHEMA[A.tab], rows = cfg[A.tab];
      body = `<div class="row between"><p class="sub">${sc.help}</p><button class="primary" data-act="a-new" data-id="${A.tab}">Add ${sc.one}</button></div>
        <div class="table-wrap"><table><thead><tr>${sc.cols.map(c => `<th>${c[1]}</th>`).join('')}<th></th></tr></thead><tbody>
        ${rows.map((r, i) => `<tr>${sc.cols.map(c => `<td>${cell(A.tab, c[0], r)}</td>`).join('')}<td class="acts">
          <button class="mini" data-act="a-move" data-id="${esc(r.id)}" data-d="-1" ${i ? '' : 'disabled'} aria-label="Move up">▲</button>
          <button class="mini" data-act="a-move" data-id="${esc(r.id)}" data-d="1" ${i < rows.length - 1 ? '' : 'disabled'} aria-label="Move down">▼</button>
          <button class="mini" data-act="a-edit" data-id="${esc(r.id)}">Edit</button><button class="mini danger" data-act="a-del" data-id="${esc(r.id)}">Delete</button></td></tr>`).join('') || `<tr><td colspan="9" class="empty">Nothing here yet.</td></tr>`}
        </tbody></table></div>`;
    }
    return `<section class="admin"><div class="row between"><h1>Admin</h1><button class="ghost" data-act="a-out">Sign out</button></div>
      <div class="tabs" role="tablist">${TABS.map(t => `<button role="tab" aria-selected="${t === A.tab}" class="${t === A.tab ? 'on' : ''}" data-act="a-tab" data-id="${t}">${t === 'settings' ? 'Settings & data' : t === 'questions' ? 'Questions' : SCHEMA[t].title} ${cfg[t] ? `<small>${cfg[t].length}</small>` : ''}</button>`).join('')}</div>
      <div class="card">${body}</div></section>`;
  }
  function adminQuestions() {
    const A = S.admin;
    const rows = cfg.questions.filter(q => (!A.fScenario || q.scenario === A.fScenario) && (!A.fEvent || q.event === A.fEvent));
    const o = (list, key, cur, first) => first + list.map(x => `<option value="${esc(x.id)}" ${x.id === cur ? 'selected' : ''}>${esc(x[key])}</option>`).join('');
    return `<div class="row between wrap"><div class="row wrap">
        <label class="field inline"><span>Scenario</span><select data-filter="fScenario"><option value="">Any</option><option value="*" ${A.fScenario === '*' ? 'selected' : ''}>All scenarios (shared)</option>${o(cfg.scenarios, 'title', A.fScenario, '')}</select></label>
        <label class="field inline"><span>Event</span><select data-filter="fEvent">${o(cfg.events, 'name', A.fEvent, '<option value="">Any</option>')}</select></label></div>
      <button class="primary" data-act="q-new">Add question</button></div>
      <p class="sub">${rows.length} of ${cfg.questions.length} questions. Use {client}, {initiative} and {portfolio} in text to personalise shared questions.</p>
      <div class="table-wrap"><table><thead><tr><th>Question</th><th>Scenario</th><th>Event</th><th>For</th><th>Type</th><th></th></tr></thead><tbody>
      ${rows.map(q => `<tr><td>${esc(q.prompt.length > 110 ? q.prompt.slice(0, 110) + '…' : q.prompt)}</td><td>${esc(nameOf(cfg.scenarios, q.scenario, 'title', 'All scenarios'))}</td><td>${esc(nameOf(cfg.events, q.event, 'name'))}</td><td>${q.roles.length ? q.roles.map(id => { const r = byId(cfg.roles, id); return esc(r ? r.short || r.name : '—'); }).join(', ') : 'Everyone'}</td><td>${q.type === 'multi' ? 'Multi-select' : q.type === 'text' ? 'Free text' : 'Single choice'}</td>
        <td class="acts"><button class="mini" data-act="q-edit" data-id="${esc(q.id)}">Edit</button><button class="mini danger" data-act="q-del" data-id="${esc(q.id)}">Delete</button></td></tr>`).join('') || '<tr><td colspan="6" class="empty">No questions match.</td></tr>'}
      </tbody></table></div>`;
  }
  function adminSettings() {
    const hist = store.get(KEY.hist) || [];
    return `<div class="grid two">
      <div><h3>Share your changes</h3>
        <p class="sub">Edits are saved in <b>this browser only</b>. To give every user the same content, export the configuration and either import it on their device or publish it as <code>config.json</code> next to <code>index.html</code> — the simulator loads that file automatically.</p>
        <div class="row wrap"><button class="primary" data-act="a-export">Export configuration</button>
        <label class="btn ghost">Import configuration<input type="file" accept="application/json,.json" data-import hidden></label></div>
        <p class="fine">${customised ? 'This browser is using locally edited content.' : 'This browser is using the published content.'}</p>
        <h3>Reset</h3><p class="sub">Discard local edits and return to the published content.</p>
        <button class="ghost danger" data-act="a-reset">Reset content</button></div>
      <div><h3>Default run length</h3>
        <label class="field"><span>Pre-selected on the mission briefing; participants can still change it</span><select data-setting="runLength">${LENGTHS.map(l => `<option value="${l.id}" ${l.id === (cfg.runLength || 'full') ? 'selected' : ''}>${l.name}${l.target === Infinity ? ' — every question' : ' — about ' + l.target + ' decisions'}</option>`).join('')}</select></label>
        <h3>Admin PIN</h3>
        <form data-form="newpin"><label class="field"><span>New PIN</span><input type="password" name="pin" minlength="4" required autocomplete="off"></label><button class="primary">Change PIN</button></form>
        <p class="fine">The PIN is stored with the configuration in plain form and only deters casual changes.</p></div></div>
      <h3>Session results on this device <small>(${hist.length})</small></h3>
      <div class="row wrap"><button class="ghost" data-act="h-csv" ${hist.length ? '' : 'disabled'}>Export results as CSV</button><button class="ghost danger" data-act="h-clear" ${hist.length ? '' : 'disabled'}>Clear results</button></div>
      <div class="table-wrap"><table><thead><tr><th>When</th><th>Team</th><th>Portfolio</th><th>Level</th><th>Role</th><th>Scenario</th><th class="num">Score</th></tr></thead><tbody>
      ${hist.map(h => `<tr><td>${esc(new Date(h.at).toLocaleString())}</td><td>${esc(h.team || '—')}</td><td>${esc(h.portfolio)}</td><td>${esc(h.level)}</td><td>${esc(h.role)}</td><td>${esc(h.scenario)}</td><td class="num">${h.score}</td></tr>`).join('') || '<tr><td colspan="7" class="empty">No completed runs yet.</td></tr>'}
      </tbody></table></div>`;
  }

  /* ── admin modals ── */
  function fieldHtml(f, v) {
    const t = f.t || 'text';
    if (t === 'bool') return `<label class="check"><input type="checkbox" name="${f.k}" ${v !== false ? 'checked' : ''}> ${f.l}</label>`;
    if (t === 'textarea') return `<label class="field"><span>${f.l}</span><textarea name="${f.k}" rows="3">${esc(v || '')}</textarea></label>`;
    if (t === 'select') return `<label class="field"><span>${f.l}</span><select name="${f.k}">${f.opts().map(o => `<option value="${esc(o[0])}" ${o[0] === v ? 'selected' : ''}>${esc(o[1])}</option>`).join('')}</select></label>`;
    if (t === 'multi') return `<fieldset class="field"><legend>${f.l}</legend><div class="checks">${f.opts().map(o => `<label class="check"><input type="checkbox" name="${f.k}" value="${esc(o[0])}" ${(v || []).includes(o[0]) ? 'checked' : ''}> ${esc(o[1])}</label>`).join('')}</div></fieldset>`;
    return `<label class="field"><span>${f.l}</span><input type="text" name="${f.k}" value="${esc(v || '')}" ${f.req ? 'required' : ''}></label>`;
  }
  function renderModal() {
    const root = $('#modal');
    if (!modal) { root.innerHTML = ''; root.hidden = true; return; }
    let inner;
    if (modal.kind === 'info') {
      const isLevel = modal.type === 'levels', x = byId(cfg[modal.type], modal.id);
      if (!x) { modal = null; root.innerHTML = ''; root.hidden = true; return; }
      const points = String(x.more || '').split('\n').map(t => t.trim()).filter(Boolean);
      const li = (list, f) => list.map(f).join('');
      const roles = isLevel ? cfg.roles.filter(r => r.levels.includes(x.id)) : [];
      const levels = isLevel ? [] : cfg.levels.filter(l => x.levels.includes(l.id));
      const key = isLevel ? [] : cfg.events.filter(e => e.keyRoles.includes(x.id));
      const events = isLevel ? cfg.events.filter(e => e.levels.includes(x.id)) : key.length ? key : cfg.events.filter(e => e.levels.some(l => x.levels.includes(l)));
      inner = `<p class="eyebrow">${isLevel ? 'Work breakdown level' : 'Agile role'}</p><h2>${esc(x.name)}${isLevel && x.alias ? ` <small class="aka">${esc(x.alias)}</small>` : ''}</h2>
        <p class="lede">${esc(x.blurb || '')}</p>
        ${points.length ? `<h3>${isLevel ? 'What this level is about' : 'What you do in this role'}</h3><ul class="qs">${li(points, t => `<li>${esc(t)}</li>`)}</ul>` : ''}
        ${roles.length ? `<h3>Roles you will find here</h3><div class="row wrap">${li(roles, r => `<span class="chip">${esc(r.name)}</span>`)}</div>` : ''}
        ${levels.length ? `<h3>Where this role sits</h3><div class="row wrap">${li(levels, l => `<span class="chip">${esc(l.name)}</span>`)}</div>` : ''}
        ${events.length ? `<h3>${isLevel ? 'Events at this level' : key.length ? 'Events where you are a key voice' : 'Events you attend'}</h3><ul class="qs">${li(events, e => `<li><b>${esc(e.name)}</b>${e.cadence ? ' — ' + esc(e.cadence) : ''}</li>`)}</ul>` : ''}
        <div class="row between info-foot"><button class="ghost" data-act="m-close">Close</button>
        ${isLevel || x.levels.includes(P().level) ? `<button class="primary" data-act="${isLevel ? 'set-level' : 'set-role'}" data-id="${esc(x.id)}">Choose this ${isLevel ? 'level' : 'role'}</button>` : ''}</div>`;
    } else if (modal.kind === 'entity') {
      const sc = SCHEMA[modal.type], d = modal.draft;
      inner = `<h2>${modal.isNew ? 'Add' : 'Edit'} ${sc.one}</h2><form data-form="entity">${sc.fields.map(f => fieldHtml(f, d[f.k] === undefined ? f.def : d[f.k])).join('')}
        <div class="row between"><button type="button" class="ghost" data-act="m-close">Cancel</button><button class="primary">Save</button></div></form>`;
    } else {
      const d = modal.draft, ev = byId(cfg.events, d.event);
      const lv = cfg.levels.filter(l => !ev || ev.levels.includes(l.id));
      inner = `<h2>${modal.isNew ? 'Add' : 'Edit'} question</h2><form data-form="question">
        <div class="grid two">
          ${fieldHtml({ k: 'scenario', l: 'Scenario', t: 'select', opts: optAll(() => cfg.scenarios, 'title', 'All scenarios (shared)') }, d.scenario)}
          ${fieldHtml({ k: 'event', l: 'Agile event', t: 'select', opts: optAll(() => cfg.events, 'name') }, d.event)}
          ${fieldHtml({ k: 'type', l: 'Answer type', t: 'select', opts: () => [['single', 'Single choice (scored)'], ['multi', 'Multi-select (scored)'], ['text', 'Free text (captured in plan)']] }, d.type)}
          ${fieldHtml({ k: 'levels', l: 'Limit to levels (none ticked = everyone at the event)', t: 'multi', opts: () => lv.map(l => [l.id, l.name]) }, d.levels)}
        </div>
        ${fieldHtml({ k: 'roles', l: 'Limit to roles (none ticked = every role)', t: 'multi', opts: () => cfg.roles.filter(r => !ev || r.levels.some(l => ev.levels.includes(l))).map(r => [r.id, r.name]) }, d.roles)}
        <label class="field"><span>Question</span><textarea name="prompt" rows="3" required>${esc(d.prompt)}</textarea></label>
        ${d.type === 'text' ? '' : `<h3>Answer options</h3><p class="fine">Impact is the change to each measure, from −20 to +20. The option with the highest total is shown as recommended practice.</p>
        ${d.options.map((o, i) => `<div class="optedit" data-opt="${i}">
          <div class="row between"><b>Option ${String.fromCharCode(65 + i)}</b><button type="button" class="mini danger" data-act="q-opt-del" data-i="${i}" ${d.options.length > 2 ? '' : 'disabled'}>Remove</button></div>
          <label class="field"><span>Answer text</span><input type="text" data-o="text" value="${esc(o.text)}"></label>
          <div class="impacts">${cfg.metrics.map(m => `<label class="field"><span>${esc(m.name)}</span><input type="number" min="-20" max="20" step="1" data-o="${m.id}" value="${+o.impact[m.id] || 0}"></label>`).join('')}</div>
          <label class="field"><span>Feedback shown after answering</span><textarea rows="2" data-o="feedback">${esc(o.feedback)}</textarea></label></div>`).join('')}
        <button type="button" class="ghost" data-act="q-opt-add">Add option</button>`}
        <div class="row between"><button type="button" class="ghost" data-act="m-close">Cancel</button><button class="primary">Save question</button></div></form>`;
    }
    root.hidden = false;
    root.innerHTML = `<div class="modal-back" data-act="m-close"></div><div class="modal-box" role="dialog" aria-modal="true">${inner}</div>`;
  }
  function readEntityForm(form, fields, into) {
    fields.forEach(f => {
      const t = f.t || 'text';
      if (t === 'bool') into[f.k] = form.elements[f.k].checked;
      else if (t === 'multi') into[f.k] = $$(`input[name="${f.k}"]:checked`, form).map(i => i.value);
      else into[f.k] = form.elements[f.k].value.trim();
    });
  }
  function syncQuestionDraft() {
    const form = $('form[data-form="question"]'), d = modal.draft;
    if (!form) return;
    d.scenario = form.elements.scenario.value; d.event = form.elements.event.value; d.type = form.elements.type.value;
    d.levels = $$('input[name="levels"]:checked', form).map(i => i.value);
    d.roles = $$('input[name="roles"]:checked', form).map(i => i.value);
    d.prompt = form.elements.prompt.value.trim();
    $$('.optedit', form).forEach(el => {
      const o = d.options[+el.dataset.opt];
      o.text = $('[data-o="text"]', el).value.trim(); o.feedback = $('[data-o="feedback"]', el).value.trim();
      cfg.metrics.forEach(m => { o.impact[m.id] = clamp(Math.round(+$(`[data-o="${m.id}"]`, el).value || 0), -20, 20); });
    });
  }
  const blankOption = () => { const impact = {}; cfg.metrics.forEach(m => { impact[m.id] = 0; }); return { text: '', feedback: '', impact }; };

  function deleteEntity(type, id) {
    const item = byId(cfg[type], id); if (!item) return;
    const qs = type === 'scenarios' ? cfg.questions.filter(q => q.scenario === id) : type === 'events' ? cfg.questions.filter(q => q.event === id) : [];
    const extra = qs.length ? `\n\nIts ${qs.length} question(s) will be deleted too.`
      : type === 'portfolios' && cfg.scenarios.some(s => s.portfolio === id) ? '\n\nIts scenarios will become available to all portfolios.' : '';
    if (!confirm(`Delete "${item.name || item.title}"?${extra}`)) return;
    cfg[type] = cfg[type].filter(x => x.id !== id);
    if (qs.length) cfg.questions = cfg.questions.filter(q => !qs.includes(q));
    if (type === 'portfolios') cfg.scenarios.forEach(s => { if (s.portfolio === id) s.portfolio = '*'; });
    if (type === 'levels') { cfg.roles.concat(cfg.events, cfg.questions).forEach(x => { x.levels = x.levels.filter(l => l !== id); }); }
    if (type === 'roles') { cfg.events.forEach(e => { e.keyRoles = e.keyRoles.filter(r => r !== id); }); cfg.questions.forEach(q => { q.roles = q.roles.filter(r => r !== id); }); }
    saveCfg(); render();
  }
  function download(name, text, type) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  /* ───────────── render ───────────── */
  function render(top) {
    const views = { home: vHome, setup: vSetup, play: vPlay, debrief: vDebrief, admin: vAdmin };
    if (!onBriefing()) B.stop();
    $('#app').innerHTML = header() + `<main id="main">${(views[S.view] || vHome)()}</main>`;
    store.set(KEY.ses, S, sessionStorage);
    if (top) window.scrollTo(0, 0);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      $$('.bar span[data-w]').forEach(el => { el.style.width = el.dataset.w + '%'; });
      const loco = $('.loco'); if (loco) loco.style.left = loco.dataset.left + '%';
      const cur = $('.track li.cur'); if (cur && cur.scrollIntoView && top) cur.parentNode.scrollLeft = cur.offsetLeft - 80;
    }));
    const fb = $('#fb'); if (fb) { const n = $('#next'); if (n) n.focus({ preventScroll: true }); fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
  }

  /* ───────────── actions ───────────── */
  const ACT = {
    home() { go('home'); },
    theme() {
      const cur = document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next; store.set(KEY.theme, next);
    },
    begin() { S.run = null; go('setup', 0); },
    resume() { go('play'); },
    step(el) { go('setup', clamp(+el.dataset.id, 0, 3)); playBrief(); },
    'brief-play'() { playBrief(); },
    'brief-sound'() {
      const on = B.toggle(); render();
      if (on) { B.sfx('partial'); playBrief(); } else toast('Sound off.');
    },
    'set-portfolio'(el) {
      if (P().portfolio !== el.dataset.id) P().scenario = null;
      P().portfolio = el.dataset.id; go('setup', 1);
    },
    learn(el) { modal = { kind: 'info', type: el.dataset.kind, id: el.dataset.id }; renderModal(); },
    'set-level'(el) {
      modal = null; renderModal();
      if (P().level !== el.dataset.id) P().role = null;
      P().level = el.dataset.id; go('setup', 2);
    },
    'set-role'(el) {
      modal = null; renderModal();
      P().role = el.dataset.id;
      const list = scenariosFor(P().portfolio);
      if (!byId(list, P().scenario)) P().scenario = list[0] ? list[0].id : null;
      go('setup', 3); playBrief();
    },
    'set-scenario'(el) { P().scenario = el.dataset.id; render(); playBrief(); },
    'set-length'(el) {      // updated in place so the briefing keeps playing
      P().length = el.dataset.id; store.set(KEY.ses, S, sessionStorage);
      $$('[data-act="set-length"]').forEach(b => { b.classList.toggle('on', b === el); b.setAttribute('aria-pressed', b === el); });
      $('#run-n').textContent = el.dataset.n;
    },
    start() { startRun(); },
    pick(el) {
      if (el.dataset.multi) el.classList.toggle('on');
      else $$('.opt').forEach(o => o.classList.toggle('on', o === el));
      $$('.opt').forEach(o => o.setAttribute('aria-checked', o.classList.contains('on')));
      $('#confirm').disabled = !$('.opt.on');
    },
    confirm() { confirmAnswer(); },
    next() { nextQuestion(); },
    quit() { if (confirm('Leave this run? Your progress will be lost.')) { S.run = null; go('home'); } },
    replay() { startRun(); },
    print() { window.print(); },

    admin() { go('admin'); },
    'a-out'() { S.admin.authed = false; go('home'); },
    'a-tab'(el) { S.admin.tab = el.dataset.id; render(); },
    'a-new'(el) { modal = { kind: 'entity', type: el.dataset.id, isNew: true, draft: {} }; renderModal(); },
    'a-edit'(el) { modal = { kind: 'entity', type: S.admin.tab, draft: clone(byId(cfg[S.admin.tab], el.dataset.id)) }; renderModal(); },
    'a-del'(el) { deleteEntity(S.admin.tab, el.dataset.id); },
    'a-move'(el) {
      const list = cfg[S.admin.tab], i = list.findIndex(x => x.id === el.dataset.id), j = i + +el.dataset.d;
      if (i < 0 || j < 0 || j >= list.length) return;
      list.splice(j, 0, list.splice(i, 1)[0]); saveCfg(); render();
    },
    'q-new'() {
      const A = S.admin;
      modal = { kind: 'question', isNew: true, draft: { id: uid('q'), scenario: A.fScenario || '*', event: A.fEvent || (cfg.events[0] || {}).id, levels: [], roles: [], type: 'single', prompt: '', options: [blankOption(), blankOption(), blankOption()] } };
      renderModal();
    },
    'q-edit'(el) {
      const d = clone(byId(cfg.questions, el.dataset.id));
      while (d.options.length < 2) d.options.push(blankOption());
      modal = { kind: 'question', draft: d }; renderModal();
    },
    'q-del'(el) {
      if (!confirm('Delete this question?')) return;
      cfg.questions = cfg.questions.filter(q => q.id !== el.dataset.id); saveCfg(); render();
    },
    'q-opt-add'() { syncQuestionDraft(); modal.draft.options.push(blankOption()); renderModal(); },
    'q-opt-del'(el) { syncQuestionDraft(); modal.draft.options.splice(+el.dataset.i, 1); renderModal(); },
    'm-close'() { modal = null; renderModal(); },
    'a-export'() {
      download('agile-simulator-config.json', JSON.stringify(cfg, null, 2), 'application/json');
      toast('Configuration exported.');
    },
    'a-reset'() {
      if (!confirm('Discard all local content edits on this device?')) return;
      store.del(KEY.cfg); cfg = clone(baseCfg); customised = false; S.run = null; render(); toast('Content reset.');
    },
    'h-clear'() { if (confirm('Clear all saved results on this device?')) { store.del(KEY.hist); render(); } },
    'h-csv'() {
      const hist = store.get(KEY.hist) || [], c = v => '"' + String(v == null ? '' : v).replace(/"/g, '""').replace(/^([=+\-@])/, "'$1") + '"';
      const rows = [['When', 'Team', 'Portfolio', 'Level', 'Role', 'Scenario', 'Score'].concat(cfg.metrics.map(m => m.name))]
        .concat(hist.map(h => [h.at, h.team, h.portfolio, h.level, h.role, h.scenario, h.score].concat(cfg.metrics.map(m => (h.metrics || {})[m.id]))));
      download('agile-simulator-results.csv', rows.map(r => r.map(c).join(',')).join('\r\n'), 'text/csv');
    }
  };

  document.addEventListener('click', e => {
    const el = e.target.closest('[data-act]');
    if (!el || el.disabled) return;
    const fn = ACT[el.dataset.act];
    if (fn) { if (el.tagName !== 'INPUT') e.preventDefault(); fn(el); }
  });
  document.addEventListener('input', e => {
    if (e.target.dataset.bind === 'team') { P().team = e.target.value; store.set(KEY.ses, S, sessionStorage); }
  });
  document.addEventListener('change', e => {
    const t = e.target;
    if (t.dataset.filter) { S.admin[t.dataset.filter] = t.value; render(); }
    if (t.dataset.setting === 'runLength') { cfg.runLength = t.value; saveCfg(); toast('Default run length saved.'); }
    if (modal && modal.kind === 'question' && (t.name === 'type' || t.name === 'event')) { syncQuestionDraft(); renderModal(); }
    if (t.matches('[data-import]') && t.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        let c = null; try { c = normalise(JSON.parse(reader.result)); } catch (err) { /* handled below */ }
        if (!c) return toast('That file is not a valid simulator configuration.');
        if (!confirm('Replace the content on this device with the imported configuration?')) return;
        cfg = c; S.run = null; saveCfg(); render(); toast('Configuration imported.');
      };
      reader.readAsText(t.files[0]);
    }
  });
  document.addEventListener('submit', e => {
    const form = e.target, kind = form.dataset.form;
    if (!kind) return;
    e.preventDefault();
    if (kind === 'pin') {
      if (form.elements.pin.value === cfg.adminPin) { S.admin.authed = true; render(); } else { toast('Incorrect PIN.'); form.reset(); }
    } else if (kind === 'newpin') {
      cfg.adminPin = form.elements.pin.value; saveCfg(); form.reset(); toast('PIN changed.');
    } else if (kind === 'entity') {
      const sc = SCHEMA[modal.type], d = modal.draft;
      readEntityForm(form, sc.fields, d);
      if (modal.isNew) { d.id = uid(sc.prefix); cfg[modal.type].push(d); }
      else Object.assign(byId(cfg[modal.type], d.id), d);
      saveCfg(); modal = null; renderModal(); render(); toast('Saved.');
    } else if (kind === 'question') {
      syncQuestionDraft();
      const d = modal.draft;
      if (!byId(cfg.events, d.event)) return toast('Choose an agile event.');
      if (d.type === 'text') d.options = [];
      else {
        d.options = d.options.filter(o => o.text);
        if (d.options.length < 2) { while (d.options.length < 2) d.options.push(blankOption()); renderModal(); return toast('Add at least two answer options with text.'); }
      }
      const i = cfg.questions.findIndex(q => q.id === d.id);
      if (i < 0) cfg.questions.push(d); else cfg.questions[i] = d;
      saveCfg(); modal = null; renderModal(); render(); toast('Question saved.');
    }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal) ACT['m-close'](); });

  /* ───────────── boot ───────────── */
  const theme = store.get(KEY.theme); if (theme) document.documentElement.dataset.theme = theme;
  const ready = () => {
    const local = normalise(store.get(KEY.cfg));
    if (local) { cfg = local; customised = true; }
    const ses = store.get(KEY.ses, sessionStorage);
    if (ses && ses.profile && ses.admin) S = Object.assign(fresh(), ses);
    if ((S.view === 'play' || S.view === 'debrief') && !S.run) S.view = 'home';
    render();
  };
  fetch('config.json', { cache: 'no-store' })
    .then(r => (r.ok ? r.json() : Promise.reject()))
    .then(j => { const c = normalise(j); if (c) { baseCfg = c; cfg = clone(c); } })
    .catch(() => { /* no shared config published — use built-in defaults */ })
    .then(ready);
})();
