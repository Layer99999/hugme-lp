// 冒頭の背景：パパ・ママ・3〜4歳の娘が湖のある丘を手をつないで駆け、3人で輪になって宙に浮かんで回る水彩の動画（約10秒・1回だけ）。
// 動画は最後に薄く消え、そのあと3人の静かな絵を薄く出す。静かな絵は約20秒ごとに、ゆっくり現れては消える。
// 動きを減らす設定の人には動画を流さず、静かな絵だけを出す。動画はボタンのあたりが画面に入ってから読み込む。
(function () {
  var hero = document.querySelector('.hero');
  var art = hero && hero.querySelector('.hero-art');
  if (!art) return;
  var video = art.querySelector('.hero-video');
  var still = art.querySelector('.hero-still');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function rel(el) { var hr = hero.getBoundingClientRect(), r = el.getBoundingClientRect(); return { l: r.left - hr.left, r: r.right - hr.left, t: r.top - hr.top, b: r.bottom - hr.top, w: hr.width, h: hr.height }; }
  // スマホでは、デモのスマホの真下から、ダウンロードのボタンの上までの間に動画を流す
  function placeVideo() {
    if (!video) return;
    var phone = hero.querySelector('.hero-demo .phone'), btn = hero.querySelector('.hero-cta .btn-store');
    if (window.innerWidth >= 900 || !phone || !btn) { video.style.top = ''; video.style.height = ''; return; }
    var p = rel(phone), b = rel(btn);
    video.style.top = p.b + 'px';
    video.style.height = Math.max(160, b.t - p.b) + 'px';
  }
  // 静止画：パソコンはデモのスマホの左の縁を中心に、ママの頭がスマホに隠れない高さで置く（文字の後ろに隠れてもよい）
  //         スマホは画面の横幅いっぱいに、下の辺を無料ダウンロードのボタンのすぐ上にそろえて置く
  function placeStill() {
    if (!still) return;
    var phone = hero.querySelector('.hero-demo .phone') || hero.querySelector('.hero-demo');
    if (!phone) return;
    var p = rel(phone), w, h;
    if (window.innerWidth >= 900) {
      w = Math.min(620, p.w * 0.48); h = w * 470 / 600;
      still.style.left = (p.l - w / 2) + 'px';
      still.style.top = (p.b + 10 - h * 0.27) + 'px'; // 絵の上から27%がママの頭の上端
    } else {
      var btn = hero.querySelector('.hero-cta .btn-store');
      w = p.w; h = w * 470 / 600;
      still.style.left = '0px';
      still.style.top = ((btn ? rel(btn).t : p.b + h) - h) + 'px'; // 下の辺を無料ダウンロードのボタンのすぐ上に
    }
    still.style.width = w + 'px';
  }
  function showStill() { placeStill(); if (still) still.classList.add('on'); }
  function play() {
    placeVideo();
    if (!video || reduce) { showStill(); return; }
    var webm = document.createElement('source'); webm.src = '/assets/hero-family.webm'; webm.type = 'video/webm';
    var mp4 = document.createElement('source'); mp4.src = '/assets/hero-family.mp4'; mp4.type = 'video/mp4';
    video.appendChild(webm); video.appendChild(mp4);
    video.addEventListener('playing', function () { video.classList.add('on'); }, { once: true });
    video.addEventListener('ended', function () { video.classList.remove('on'); showStill(); }, { once: true });
    video.addEventListener('error', showStill, { once: true });
    video.load();
    var p = video.play();
    if (p && p.catch) p.catch(showStill);
  }
  function start() {
    var target = hero.querySelector('.hero-cta') || hero;
    if (!('IntersectionObserver' in window)) { play(); return; }
    var io = new IntersectionObserver(function (es) {
      if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); play(); }
    }, { threshold: 0.3 });
    io.observe(target);
  }
  window.addEventListener('resize', function () { placeVideo(); if (still && still.classList.contains('on')) placeStill(); });
  if (document.readyState === 'complete') setTimeout(start, 200);
  else window.addEventListener('load', function () { setTimeout(start, 200); });
})();
