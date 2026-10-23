/* はぐみぃ LP 共通のヘッダーとメニュー（2026-10-16）
   どのページでも同じヘッダー（上に固定）・PC の左の目次・右上の三本線のメニューを出す。
   各ページの元のヘッダーは、この部品が読み込まれたときに置き換える（読み込めないときは元のヘッダーのまま）。
   NEW のマーク：お知らせ（/announcements.json）とプレスリリース（/press/ の先頭の日付）が公開から7日以内で、
   その端末でまだ開いていないときだけ出す。 */
(function () {
  if (window.__hmSiteNav) return; window.__hmSiteNav = true;
  var path = location.pathname;
  var isTop = path === '/' || path === '/index.html';
  var T = function (hash) { return (isTop ? '' : '/') + hash; }; // トップのセクションへのリンク

  var IC = {
    play: '<circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>',
    phone: '<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    swap: '<path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>',
    grid: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
    checks: '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
    steps: '<path d="M10 12h11"/><path d="M10 18h11"/><path d="M10 6h11"/><path d="M4 10h2"/><path d="M4 6h1v4"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>',
    landmark: '<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
    book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
    scale: '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'
  };
  var svg = function (k) { return '<svg class="hm-ic" viewBox="0 0 24 24" aria-hidden="true">' + IC[k] + '</svg>'; };
  var NEWB = function (kind) { return '<span class="hm-new" data-new="' + kind + '" hidden>NEW</span>'; };

  // PC の左の目次（トップのセクション）
  var TOC = [
    ['はぐみぃを知る', [['#video', 'play', '紹介動画'], ['#news', 'bell', '最新のお知らせ', 'news'], ['#features', 'phone', 'アプリでできること']]],
    ['なぜ必要か', [['#why', 'info', '必要な理由'], ['#reasons', 'heart', '助けになる理由'], ['#compare', 'swap', 'これまでとの違い']]],
    ['機能と始め方', [['#functions', 'grid', '主な機能'], ['#choose', 'checks', 'アプリの選び方'], ['#steps', 'steps', '始めるまでの3ステップ']]],
    ['安心のために', [['#moj', 'landmark', '法務省の一覧表への掲載'], ['#privacy', 'lock', 'プライバシーへの配慮']]],
    ['もっと知る', [['#faq', 'help', 'よくある質問'], ['#learn', 'book', '共同養育ガイド'], ['#download', 'download', 'ダウンロード']]]
  ];
  // スマホ・狭い画面の三本線のメニュー
  var MENU = [
    [T('#news'), 'bell', '最新のお知らせ', 'news'],
    ['/press/', 'megaphone', 'プレスリリース', 'press'],
    [T('#video'), 'play', '紹介動画'],
    [T('#functions'), 'grid', '主な機能'],
    [T('#faq'), 'help', 'よくある質問'],
    ['/guide/', 'book', '共同養育ガイド'],
    ['/column/', 'file', 'お役立ちコラム'],
    ['/for-mediators/', 'scale', '調停員の皆様へ'],
    ['/for-professionals/', 'users', '支援団体・士業・自治体の方へ']
  ];

  var css = [
    '.hm-header{position:sticky;top:0;z-index:50;background:rgba(255,252,247,.97);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);font-family:-apple-system,"Hiragino Maru Gothic ProN","Hiragino Sans",sans-serif;line-height:1.5;transition:box-shadow .2s ease;margin:0;}',
    'body.hm-scrolled .hm-header{box-shadow:0 2px 12px rgba(83,61,47,.10);}',
    '.hm-header *{box-sizing:border-box;}',
    '.hm-hrow{display:flex;align-items:center;justify-content:space-between;gap:10px;max-width:960px;margin:0 auto;padding:18px 24px;}',
    '.hm-header a{text-decoration:none;}',
    '.hm-brand{display:flex;align-items:center;gap:10px;color:#3a3a3a;}',
    '.hm-brand img{width:36px;height:36px;border-radius:10px;display:block;}',
    '.hm-brand span{font-weight:700;font-size:18px;color:#3a3a3a;}',
    '.hm-hbtns{display:flex;align-items:center;gap:10px;}',
    '.hm-pill{position:relative;display:inline-block;color:#3a3a3a;border:1px solid rgba(139,111,94,.28);background:#fff;padding:8px 16px;border-radius:999px;font-weight:700;font-size:13px;white-space:nowrap;}',
    '.hm-pill.hm-strong{border:1.5px solid #F4A261;color:#D9772F;background:#FFF4EA;}',
    '.hm-cta{display:inline-block;background:#F4A261;color:#fff !important;padding:9px 20px;border-radius:999px;font-weight:700;font-size:14px;white-space:nowrap;}',
    '.hm-new{display:inline-block;margin-left:6px;padding:1px 6px;border-radius:999px;background:#E8574A;color:#fff;font-size:10px;font-weight:800;letter-spacing:.04em;line-height:1.5;vertical-align:middle;}',
    '.hm-new[hidden]{display:none;}',
    '.hm-pill .hm-new{position:absolute;top:-8px;right:-6px;margin:0;}',
    '.hm-burger{flex:none;width:44px;height:44px;border-radius:14px;border:1px solid rgba(139,111,94,.28);background:#fff;display:none;align-items:center;justify-content:center;cursor:pointer;padding:0;}',
    '.hm-burger span,.hm-burger span::before,.hm-burger span::after{display:block;width:20px;height:2px;border-radius:2px;background:#4a4440;position:relative;content:"";}',
    '.hm-burger span::before{position:absolute;top:-6px;left:0;}',
    '.hm-burger span::after{position:absolute;top:6px;left:0;}',
    '.hm-sub{display:none;}',
    '[id]{scroll-margin-top:92px;}',
    '.hm-toc{position:fixed;top:100px;left:max(16px,calc((100vw - 960px) / 2 - 212px));width:200px;max-height:calc(100vh - 116px);overflow-y:auto;z-index:40;display:none;font-family:-apple-system,"Hiragino Maru Gothic ProN","Hiragino Sans",sans-serif;}',
    '.hm-toc-title{font-size:12px;font-weight:700;color:#8a7f76;letter-spacing:.06em;margin:0 0 8px 12px;}',
    '.hm-toc-group{font-size:11.5px;font-weight:700;color:#B07A52;margin:12px 0 2px 12px;}',
    '.hm-toc a{display:flex;align-items:center;gap:8px;color:#4a4440;text-decoration:none;font-size:13px;line-height:1.45;padding:6px 10px;border-left:2px solid #f0e8dd;}',
    '.hm-toc a span:not(.hm-new){white-space:nowrap;}',
    '.hm-toc a:hover{color:#E8894A;}',
    '.hm-toc a.is-current{color:#D9772F;font-weight:700;border-left-color:#F4A261;background:#FBF3E8;border-radius:0 8px 8px 0;}',
    '.hm-toc .hm-ic{width:16px;height:16px;}',
    '.hm-toc .hm-new{margin-left:2px;}',
    '.hm-ic{flex:none;width:20px;height:20px;fill:none;stroke:#E8894A;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;}',
    '@media (min-width:1380px){.hm-toc{display:block;}}',
    '@media (max-width:1379px){.hm-burger{display:flex;}}',
    '@media (max-width:760px){',
    '  .hm-hrow{padding:10px 12px 6px;}',
    '  .hm-brand img{width:32px;height:32px;}',
    '  .hm-brand span{font-size:16px;}',
    '  .hm-hbtns .hm-pill{display:none;}',
    '  .hm-hbtns{gap:8px;}',
    '  .hm-cta{padding:8px 14px;font-size:13px;}',
    '  .hm-burger{width:40px;height:40px;}',
    '  .hm-sub{display:flex;gap:6px;padding:0 12px 10px;max-width:960px;margin:0 auto;}',
    '  .hm-sub .hm-pill{flex:1 1 auto;text-align:center;padding:6px 6px;font-size:12px;}',
    '  [id]{scroll-margin-top:118px;}',
    '}',
    '.hm-backdrop{position:fixed;inset:0;background:rgba(40,30,22,.32);z-index:70;opacity:0;pointer-events:none;transition:opacity .2s ease;}',
    '.hm-panel{position:fixed;top:0;right:0;bottom:0;width:min(300px,84vw);background:#FFFCF7;z-index:80;transform:translateX(100%);transition:transform .22s ease;overflow-y:auto;padding:16px 16px 28px;box-shadow:-8px 0 24px rgba(83,61,47,.14);font-family:-apple-system,"Hiragino Maru Gothic ProN","Hiragino Sans",sans-serif;line-height:1.5;}',
    'body.hm-open .hm-backdrop{opacity:1;pointer-events:auto;}',
    'body.hm-open .hm-panel{transform:none;}',
    '.hm-panel-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;}',
    '.hm-panel-head strong{font-size:15px;color:#2a2a2a;}',
    '.hm-close{width:40px;height:40px;border:none;background:transparent;font-size:26px;line-height:1;color:#6a6a6a;cursor:pointer;}',
    '.hm-panel nav a{display:flex;align-items:center;gap:12px;color:#3a3a3a;text-decoration:none;font-size:15px;padding:13px 8px;border-bottom:1px solid #f0e8dd;}',
    '.hm-panel nav a:last-child{border-bottom:none;}',
    '.hm-panel .hm-dl{display:block;margin-top:16px;text-align:center;background:#F4A261;color:#fff;font-weight:700;border-radius:999px;padding:12px;text-decoration:none;}',
    '@media (prefers-reduced-motion:reduce){.hm-panel,.hm-backdrop,.hm-header{transition:none;}}'
  ].join('\n');

  function build() {
    var st = document.createElement('style'); st.id = 'hm-site-nav-css'; st.textContent = css; document.head.appendChild(st);

    // 元のヘッダー（トップは header.nav、ほかのページは nav.navbar か header.nav）を置き換える
    var old = document.querySelector('body > header.nav') || document.querySelector('body > nav.navbar') || document.querySelector('header.nav, nav.navbar');
    var pills = '<a class="hm-pill hm-strong" href="' + T('#news') + '">お知らせ' + NEWB('news') + '</a>' +
      '<a class="hm-pill hm-strong" href="/press/">プレスリリース' + NEWB('press') + '</a>' +
      '<a class="hm-pill" href="/for-mediators/">調停員の皆様へ</a>';
    var h = document.createElement('header');
    h.className = 'hm-header';
    h.innerHTML =
      '<div class="hm-hrow">' +
        '<a class="hm-brand" href="/" aria-label="はぐみぃ トップページへ"><img src="/assets/icon-256.png" alt="はぐみぃ 共同養育アプリのアイコン" width="36" height="36"><span>はぐみぃ</span></a>' +
        '<div class="hm-hbtns">' + pills +
          '<a class="hm-cta" href="' + T('#download') + '">無料で入手</a>' +
          '<button class="hm-burger" type="button" aria-label="メニューを開く" aria-controls="hm-panel" aria-expanded="false"><span></span></button>' +
        '</div>' +
      '</div>' +
      '<div class="hm-sub">' + pills + '</div>';
    if (old) old.parentNode.replaceChild(h, old); else document.body.insertBefore(h, document.body.firstChild);

    // PC の左の目次
    var toc = '<p class="hm-toc-title">' + (isTop ? 'このページの目次' : 'トップページの目次') + '</p>';
    TOC.forEach(function (g) {
      toc += '<p class="hm-toc-group">' + g[0] + '</p>';
      g[1].forEach(function (it) { toc += '<a href="' + T(it[0]) + '">' + svg(it[1]) + '<span>' + it[2] + '</span>' + (it[3] ? NEWB(it[3]) : '') + '</a>'; });
    });
    var nav = document.createElement('nav'); nav.className = 'hm-toc'; nav.setAttribute('aria-label', isTop ? 'このページの目次' : 'トップページの目次'); nav.innerHTML = toc;
    document.body.appendChild(nav);

    // 三本線のメニュー
    var back = document.createElement('div'); back.className = 'hm-backdrop'; back.hidden = true;
    var panel = document.createElement('div'); panel.className = 'hm-panel'; panel.id = 'hm-panel'; panel.hidden = true;
    panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'true'); panel.setAttribute('aria-label', 'メニュー');
    panel.innerHTML = '<div class="hm-panel-head"><strong>メニュー</strong><button class="hm-close" type="button" aria-label="メニューを閉じる">×</button></div><nav>' +
      MENU.map(function (m) { return '<a href="' + m[0] + '">' + svg(m[1]) + '<span>' + m[2] + '</span>' + (m[3] ? NEWB(m[3]) : '') + '</a>'; }).join('') +
      '</nav><a class="hm-dl" href="' + T('#download') + '">無料でダウンロード</a>';
    document.body.appendChild(back); document.body.appendChild(panel);

    var body = document.body, burger = h.querySelector('.hm-burger');
    function open() { panel.hidden = false; back.hidden = false; requestAnimationFrame(function () { body.classList.add('hm-open'); }); burger.setAttribute('aria-expanded', 'true'); panel.querySelector('.hm-close').focus(); }
    function close() { body.classList.remove('hm-open'); burger.setAttribute('aria-expanded', 'false'); setTimeout(function () { if (!body.classList.contains('hm-open')) { panel.hidden = true; back.hidden = true; } }, 230); }
    burger.addEventListener('click', open);
    back.addEventListener('click', close);
    panel.querySelector('.hm-close').addEventListener('click', function () { close(); burger.focus(); });
    panel.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && body.classList.contains('hm-open')) { close(); burger.focus(); } });

    function onScroll() { body.classList.toggle('hm-scrolled', window.scrollY > 4); }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

    // NEW のマーク（一度開いたら、その端末では出さない。新しいものが出たらまた出す）
    var t = new Date(), today = new Date(t.getFullYear(), t.getMonth(), t.getDate());
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var todayYmd = today.getFullYear() + '-' + pad(today.getMonth() + 1) + '-' + pad(today.getDate());
    var latestOf = {};
    function isNew(ymd) { if (!ymd) return false; var p = ymd.split('-').map(Number); var d = new Date(p[0], p[1] - 1, p[2]); var days = (today - d) / 86400000; return days >= 0 && days <= 7; }
    function seenOf(kind) { try { return localStorage.getItem('hm-seen-' + kind) || ''; } catch (e) { return ''; } }
    function mark(kind, ymd) { latestOf[kind] = ymd; if (!isNew(ymd) || seenOf(kind) >= ymd) return; document.querySelectorAll('.hm-new[data-new="' + kind + '"]').forEach(function (el) { el.hidden = false; }); }
    function markSeen(kind) { var ymd = latestOf[kind]; if (ymd) { try { localStorage.setItem('hm-seen-' + kind, ymd); } catch (e) {} } document.querySelectorAll('.hm-new[data-new="' + kind + '"]').forEach(function (el) { el.hidden = true; }); }
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]'); if (!a) return;
      var href = a.getAttribute('href');
      if (/^\/?#news$/.test(href) || /^\/news\//.test(href)) markSeen('news');
      else if (/^\/press\//.test(href)) markSeen('press');
    });
    fetch('/announcements.json', { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
      var a = (j && j.announcements) || [];
      var latest = a.map(function (x) { return x && x.date; }).filter(function (d) { return /^\d{4}-\d{2}-\d{2}$/.test(d || '') && d <= todayYmd; }).sort().pop();
      // お知らせのページを開いているときは、開いたことにする
      if (/^\/news\//.test(path)) { latestOf.news = latest; markSeen('news'); } else mark('news', latest);
    }).catch(function () {});
    fetch('/press/', { cache: 'no-cache' }).then(function (r) { return r.ok ? r.text() : ''; }).then(function (html) {
      var m = /class="pr-date">(\d{4})年(\d{1,2})月(\d{1,2})日/.exec(html || '');
      if (!m) return; var ymd = m[1] + '-' + pad(+m[2]) + '-' + pad(+m[3]);
      if (/^\/press\//.test(path)) { latestOf.press = ymd; markSeen('press'); } else mark('press', ymd);
    }).catch(function () {});

    // トップでは、左の目次でいま見ている場所に色を付ける
    if (!isTop || !('IntersectionObserver' in window)) return;
    var links = [].slice.call(nav.querySelectorAll('a')); var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { links.forEach(function (a) { a.classList.remove('is-current'); }); var a = map[en.target.id]; if (a) a.classList.add('is-current'); } }); }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
