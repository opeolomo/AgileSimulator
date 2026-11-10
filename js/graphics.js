/* SVG illustrations: icons, the hero banner and the event "rooms". No external assets. */
(function () {
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const ICONS = {
    payments: '<path d="M3 8h14l-3-3M21 16H7l3 3"/>',
    liquidity: '<path d="M12 3c3.5 4.2 6 7.3 6 10.5a6 6 0 0 1-12 0C6 10.3 8.500 7.200 12 3z"/><path d="M9.500 14.500a2.500 2.500 0 0 0 2.500 2.500"/>',
    fx: '<circle cx="8" cy="9" r="5"/><circle cx="16" cy="15" r="5"/><path d="M8 7v4M6.500 9h3M16 13v4"/>',
    trade: '<path d="M3 16l2 4h14l2-4z"/><path d="M6 16v-5h12v5M9 11V7h6v4M12 7V4"/>',
    digital: '<rect x="3" y="4" width="13" height="10" rx="1.500"/><path d="M7 18h5M9.500 14v4"/><rect x="17" y="9" width="4.500" height="9" rx="1"/>',
    data: '<ellipse cx="12" cy="6" rx="7" ry="2.800"/><path d="M5 6v6c0 1.500 3.100 2.800 7 2.800s7-1.300 7-2.800V6M5 12v6c0 1.500 3.100 2.800 7 2.800s7-1.300 7-2.800v-6"/>',
    issuing: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10.500h18M7 15h4"/>',
    blockchain: '<path d="M12 6l5.200 3v6L12 18l-5.200-3V9z"/><path d="M12 12v6M6.800 9l5.200 3 5.200-3"/><circle cx="12" cy="2.800" r="1.500"/><circle cx="3.300" cy="17.500" r="1.500"/><circle cx="20.700" cy="17.500" r="1.500"/><path d="M12 4.300V6M4.600 16.700L6.800 15M19.400 16.700L17.200 15"/>',
    briefcase: '<rect x="3" y="7" width="18" height="12" rx="2"/><path d="M9 7V5h6v2M3 13h18"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.200 3 14.800 0 18M12 3c-3 3.200-3 14.800 0 18"/>',
    shield: '<path d="M12 3l8 3v6c0 4.500-3.400 7.800-8 9-4.600-1.200-8-4.500-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    chart: '<path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6"/>',
    building: '<path d="M4 21V9l8-5 8 5v12M4 21h16M9 21v-5h6v5M9 12h.01M15 12h.01"/>'
  };
  const icon = (name, size) =>
    `<svg class="ico" width="${size || 24}" height="${size || 24}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.700" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.briefcase}</svg>`;

  const train = () => `<svg viewBox="0 0 64 34" width="64" height="34" aria-hidden="true">
    <rect x="2" y="6" width="44" height="18" rx="5" fill="var(--accent)"/>
    <path d="M46 10h7c5 0 9 5 9 10v4H46z" fill="var(--accent)"/>
    <rect x="7" y="10" width="8" height="7" rx="1.500" fill="#0b1220" opacity=".55"/><rect x="19" y="10" width="8" height="7" rx="1.500" fill="#0b1220" opacity=".55"/><rect x="31" y="10" width="8" height="7" rx="1.500" fill="#0b1220" opacity=".55"/>
    <path d="M49 13h4c2.500 0 4.500 2 5 4.500h-9z" fill="#0b1220" opacity=".55"/>
    <circle cx="13" cy="27" r="4" fill="var(--amber)"/><circle cx="31" cy="27" r="4" fill="var(--amber)"/><circle cx="52" cy="27" r="4" fill="var(--amber)"/>
  </svg>`;

  /* ── people ── */
  const SKIN = ['#f2c9a5', '#d9a57b', '#a8734f', '#7a4f33', '#f0d2b6', '#c68b62'];
  const HAIR = ['#2b2118', '#5a3a22', '#111827', '#8b5e34', '#3f3f46', '#b45309'];
  const SHIRT = ['#5b8def', '#34d3b4', '#f5b942', '#f47c9b', '#a78bfa', '#6ee7a0', '#fb923c', '#7dd3fc'];
  function person(x, y, i, label, you, s) {
    s = s || 1;
    return `<g transform="translate(${x} ${y}) scale(${s})">
      ${you ? '<circle cy="8" r="30" fill="none" stroke="#f5b942" stroke-width="2.500" stroke-dasharray="5 4"><animateTransform attributeName="transform" type="rotate" from="0 0 8" to="360 0 8" dur="14s" repeatCount="indefinite"/></circle>' : ''}
      <path d="M-22 34q0-22 22-22t22 22z" fill="${SHIRT[i % SHIRT.length]}"/>
      <circle cy="-2" r="13" fill="${SKIN[(i * 5 + 1) % SKIN.length]}"/>
      <path d="M-13-3a13 13 0 0 1 26 0q-6-7-13-6t-13 6z" fill="${HAIR[(i * 3) % HAIR.length]}"/>
      <text y="50" text-anchor="middle" font-size="11" font-weight="${you ? 700 : 500}" fill="${you ? '#f5b942' : '#c7d2ea'}">${esc(label)}${you ? ' (you)' : ''}</text>
    </g>`;
  }
  function peopleRow(people, y, x0, x1) {
    const n = people.length, step = (x1 - x0) / n;
    return people.map((p, i) => person(x0 + step * (i + 0.500), y, p.i, p.label, p.you, 0.900)).join('');
  }
  function peopleArc(people, cx, cy, rx, ry) {
    const n = people.length;
    return people.map((p, i) => {
      const a = Math.PI * (0.080 + 0.840 * (n === 1 ? 0.500 : i / (n - 1)));
      return person(cx - Math.cos(a) * rx, cy + Math.sin(a) * ry, p.i, p.label, p.you, 0.850);
    }).join('');
  }

  /* ── room furniture ── */
  const NOTE = ['#ffd966', '#ff9eb5', '#9ad7ff', '#b6f2a1'];
  const rnd = seed => () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const sticky = (x, y, c, delay) =>
    `<rect class="pop" style="animation-delay:${delay}s" x="${x}" y="${y}" width="22" height="18" rx="2" fill="${c}"/>`;
  const wall = `<rect width="640" height="300" fill="#101a2e"/><rect y="215" width="640" height="85" fill="#0c1424"/><path d="M0 215h640" stroke="#24345a"/>`;
  const panel = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#17233c" stroke="#2c3f68"/>`;
  const label = (x, y, t, anchor) => `<text x="${x}" y="${y}" font-size="10" letter-spacing=".8" fill="#8fa2c9" text-anchor="${anchor || 'middle'}">${t}</text>`;

  const ROOMS = {
    board(p) {
      const r = rnd(7); let s = panel(50, 14, 540, 150);
      ['ITER 1', 'ITER 2', 'ITER 3', 'ITER 4', 'IP'].forEach((t, i) => {
        s += label(140 + i * 96, 30, t);
        if (i) s += `<path d="M${92 + i * 96} 36v120" stroke="#2c3f68"/>`;
      });
      for (let j = 0; j < 3; j++) s += `<path d="M58 ${78 + j * 40}h524" stroke="#2c3f68" opacity="${j < 2 ? 1 : 0}"/>` + label(74, 62 + j * 40, 'T' + (j + 1));
      const count = 9 + Math.round(p * 9), pts = [];
      for (let k = 0; k < 18; k++) {
        const col = Math.floor(r() * 5), row = Math.floor(r() * 3);
        const x = 98 + col * 96 + r() * 56, y = 40 + row * 40 + r() * 14;
        if (k < count) { pts.push([x + 11, y + 9]); s += sticky(x, y, NOTE[k % 4], k * 0.050); }
      }
      for (let k = 0; k + 3 < pts.length; k += 4) s += `<path class="draw" d="M${pts[k]}L${pts[k + 3]}" stroke="#ff6b6b" stroke-width="1.500" fill="none"/>`;
      return s;
    },
    kanban(p) {
      const r = rnd(11); let s = panel(50, 14, 540, 150);
      const cols = ['FUNNEL', 'REVIEW', 'ANALYSE', 'READY', 'BUILD', 'DONE'], load = [4, 3, 2, 2, 3, 1 + Math.round(p * 3)];
      cols.forEach((t, i) => {
        s += label(95 + i * 90, 30, t);
        if (i) s += `<path d="M${50 + i * 90} 36v120" stroke="#2c3f68"/>`;
        for (let k = 0; k < load[i]; k++)
          s += `<rect class="pop" style="animation-delay:${(i + k) * 0.060}s" x="${62 + i * 90 + r() * 8}" y="${40 + k * 27}" width="60" height="21" rx="3" fill="${NOTE[(i + k) % 4]}"/>`;
      });
      return s + `<path d="M62 152h516" stroke="#34d3b4" stroke-width="2" stroke-dasharray="2 6" opacity=".7"/>`;
    },
    stage(p) {
      let s = `<rect x="110" y="10" width="420" height="158" rx="10" fill="#0b1220" stroke="#34d3b4" stroke-width="2"/>`;
      s += `<rect x="126" y="24" width="120" height="8" rx="4" fill="#2c3f68"/>`;
      [38, 60, 48, 78, 66, 92].forEach((h, i) => { s += `<rect class="grow" style="animation-delay:${i * 0.080}s" x="${132 + i * 30}" y="${150 - h}" width="18" height="${h}" rx="3" fill="#34d3b4" opacity="${0.450 + i * 0.100}"/>`; });
      s += `<path class="draw" d="M340 130l34-26 30 12 38-44 46-18" fill="none" stroke="#f5b942" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
      s += `<circle cx="488" cy="54" r="5" fill="#f5b942"/>`;
      s += `<rect x="340" y="140" width="${60 + p * 110}" height="8" rx="4" fill="#5b8def"/><rect x="340" y="140" width="170" height="8" rx="4" fill="none" stroke="#2c3f68"/>`;
      return s + `<path d="M60 215l60-40h400l60 40z" fill="#152038" opacity=".6"/>`;
    },
    table() {
      let s = `<rect x="80" y="12" width="480" height="110" rx="6" fill="#0b1830" stroke="#2c3f68"/>`;
      const r = rnd(5);
      for (let i = 0; i < 16; i++) {
        const h = 24 + r() * 70, x = 88 + i * 29;
        s += `<rect x="${x}" y="${120 - h}" width="24" height="${h}" fill="#16264a"/>`;
        for (let k = 0; k < 3; k++) if (r() > 0.400) s += `<rect x="${x + 4 + (k % 2) * 10}" y="${126 - h + k * 12}" width="5" height="5" fill="#f5b942" opacity="${0.300 + r() * 0.600}"/>`;
      }
      s += `<path d="M240 12v110M400 12v110" stroke="#2c3f68"/>`;
      return s + `<ellipse cx="320" cy="262" rx="270" ry="34" fill="#22314f" stroke="#34496f"/>`;
    },
    retro(p) {
      const r = rnd(3); let s = panel(50, 14, 540, 150);
      ['WENT WELL', 'TO IMPROVE', 'ACTIONS'].forEach((t, i) => {
        s += label(140 + i * 180, 32, t);
        if (i) s += `<path d="M${50 + i * 180} 22v134" stroke="#2c3f68"/>`;
        const n = i === 2 ? 1 + Math.round(p * 2) : 5 - i;
        for (let k = 0; k < n; k++) s += sticky(70 + i * 180 + (k % 4) * 36 + r() * 6, 44 + Math.floor(k / 4) * 30 + r() * 20 + (k % 2) * 26, NOTE[i === 2 ? 3 : (i ? 1 : 0)], (i * 3 + k) * 0.060);
      });
      return s;
    },
    circle() {
      let s = panel(240, 12, 160, 86);
      ['TO DO', 'DOING', 'DONE'].forEach((t, i) => {
        s += label(267 + i * 53, 27, t);
        for (let k = 0; k < [3, 2, 3][i]; k++) s += `<rect class="pop" style="animation-delay:${(i + k) * 0.070}s" x="${250 + i * 53}" y="${34 + k * 19}" width="34" height="14" rx="2" fill="${NOTE[(i + k) % 4]}"/>`;
      });
      return s + `<ellipse cx="320" cy="250" rx="250" ry="30" fill="#152038" opacity=".7"/>`;
    }
  };

  /** scene(type, { people:[{label,you}], progress:0..1 }) */
  function scene(type, o) {
    const people = (o.people || []).slice(0, 7).map((p, i) => ({ label: p.label, you: p.you, i: p.seed == null ? i : p.seed }));
    const room = (ROOMS[type] || ROOMS.board)(o.progress || 0);
    const crowd = type === 'circle' ? peopleArc(people, 320, 138, 250, 70) : peopleRow(people, 226, 30, 610);
    return `<svg class="scene-svg" viewBox="0 0 640 300" role="img" aria-label="${esc(o.title || 'Event room')}" font-family="inherit">${wall}${room}${crowd}</svg>`;
  }

  function hero() {
    const r = rnd(21); let sky = '';
    for (let i = 0; i < 26; i++) {
      const h = 30 + r() * 110, x = i * 32;
      sky += `<rect x="${x}" y="${190 - h}" width="28" height="${h}" fill="#13203b"/>`;
      for (let k = 0; k < 5; k++) if (r() > 0.450) sky += `<rect x="${x + 5 + (k % 2) * 11}" y="${198 - h + k * 14}" width="6" height="6" fill="#f5b942" opacity="${0.200 + r() * 0.600}"/>`;
    }
    const stops = ['Strategy', 'Portfolio', 'PI Planning', 'Iterations', 'System Demo', 'Inspect & Adapt'];
    const st = stops.map((t, i) => `<g transform="translate(${70 + i * 136} 222)"><circle r="7" fill="#0b1220" stroke="#34d3b4" stroke-width="3"/><text y="26" text-anchor="middle" font-size="12" fill="#9fb0d3">${t}</text></g>`).join('');
    return `<svg class="hero-svg" viewBox="0 0 820 260" role="img" aria-label="An Agile Release Train travelling through the events of a Planning Interval">
      <rect width="820" height="260" fill="#0b1220"/><circle cx="700" cy="50" r="26" fill="#f5b942" opacity=".18"/><circle cx="700" cy="50" r="14" fill="#f5b942" opacity=".5"/>
      ${sky}<rect y="190" width="820" height="70" fill="#0d1628"/>
      <path d="M0 222h820" stroke="#2c3f68" stroke-width="4"/><path d="M0 222h820" stroke="#34d3b4" stroke-width="2" stroke-dasharray="3 12"/>
      ${st}<g class="hero-train"><g transform="translate(0 190)">${train()}</g></g></svg>`;
  }

  window.AS_GFX = { icon, iconNames: Object.keys(ICONS), train, scene, sceneNames: Object.keys(ROOMS), hero, esc };
})();
