/* はぐみぃ: 本番だけを計測。入力値・任意のURL文字列はイベントに渡さない。 */
(function (w, d) {
  'use strict';
  if (w.hugmeAnalytics) return;
  var MEASUREMENT_ID = 'G-G57V70ZJ66';
  var HOST = 'hugme.tigerlabo.com';
  var SESSION_KEY = 'hugme_campaign_v1';
  var SOURCES = ['note', 'esukuru', 'smf', 'jspf', 'visit', 'rikonterrace', 'qr-a4', 'qr-card', 'pearchil'];
  var MEDIUMS = ['article', 'community', 'qr', 'referral'];
  var CONTENTS = ['article_intro', 'article_body', 'article_footer', 'inline_tool'];
  var NOTE_KEYS = ["n29e9d4e47a8c", "n0bf2f95d53bf", "nbb4d71574d08", "nc57acacf8590", "na33a9aa4ae37", "n134b82181145", "n9f611dc60076", "n7a347a64f279", "n37fd87347d44", "n429ac7c884de", "n3ed4dcb2c884", "n3ca8f7940546", "n18eb2a85e213", "n51b719aaab32", "n06370dc30286", "nbb1aff55c75e", "n53446867a88e", "n6d0fb143af66", "n713072cc94b2", "nf543efcf469b", "n204eb7b42db6", "nb0edb3f88593", "n843dd83666f1"];
  var PAGES = ['/', '/guide/', '/for-professionals/', '/youikuhi-keisan/', '/menkai-yoteihyo/', '/guide/menkai-koryu-kimekata/', '/guide/yoiku-hi-mibarai-taisho/', '/guide/renraku-toritakunai/', '/guide/kaisei-minpo-2026-kyodo-yoiku/', '/guide/yoiku-hi-soba-jukyu/', '/guide/kodomo-kimochi-menkai/', '/guide/kyodo-yoiku-toha/', '/guide/kyodo-shinken-tandoku/', '/guide/menkai-kyohi/'];
  function contains(list, value) { return list.indexOf(value) !== -1; }
  function validatedCampaign(values) {
    var source = values.utm_source, result = {};
    if (!contains(SOURCES, source)) return result;
    result.utm_source = source;
    if (contains(MEDIUMS, values.utm_medium)) result.utm_medium = values.utm_medium;
    if (contains(CONTENTS, values.utm_content)) result.utm_content = values.utm_content;
    // Exact issued article IDs only: a syntactically safe free-text value may still identify a person.
    if (source === 'note' && contains(NOTE_KEYS, values.utm_campaign)) result.utm_campaign = values.utm_campaign;
    return result;
  }
  function fromSearch(search) {
    var p = new URLSearchParams(search), values = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach(function (key) {
      if (p.getAll(key).length === 1) values[key] = p.get(key);
    });
    return validatedCampaign(values);
  }
  function normalizedPath(path) { return path.replace(/\/index\.html$/, '/'); }
  var path = normalizedPath(w.location.pathname);
  var enabled = w.location.protocol === 'https:' && w.location.hostname === HOST && !w.location.port && contains(PAGES, path);
  var entry = fromSearch(w.location.search);
  var explicitCampaign = new URLSearchParams(w.location.search).has('utm_source');
  if (enabled) {
    try {
      var saved = JSON.parse(w.sessionStorage.getItem(SESSION_KEY) || 'null');
      if (!explicitCampaign && saved && Date.now() - saved.at < 30 * 60 * 1000 && Date.now() >= saved.at) {
        entry = validatedCampaign(saved.values || {});
      }
      if (entry.utm_source) w.sessionStorage.setItem(SESSION_KEY, JSON.stringify({at: Date.now(), values: entry}));
      else if (explicitCampaign) w.sessionStorage.removeItem(SESSION_KEY);
    } catch (_) { /* Private mode / disabled storage: this page still works. */ }
  }
  var query = new URLSearchParams(entry).toString();
  var pageLocation = 'https://' + HOST + (contains(PAGES, path) ? path : '/') + (query ? '?' + query : '');
  var pageReferrer = '';
  try {
    var referrer = new URL(d.referrer);
    if (referrer.protocol === 'https:' || referrer.protocol === 'http:') {
      pageReferrer = referrer.origin + (referrer.hostname === HOST && contains(PAGES, normalizedPath(referrer.pathname)) ? normalizedPath(referrer.pathname) : '/');
    }
  } catch (_) { /* No referrer. */ }
  w.__pageLoc = pageLocation;
  function common() {
    return {
      page_location: pageLocation, page_referrer: pageReferrer,
      entry_source: entry.utm_source || '(none)',
      entry_medium: entry.utm_medium || '(none)',
      entry_campaign: entry.utm_campaign || '(none)',
      entry_content: entry.utm_content || '(none)'
    };
  }
  function tag() { w.dataLayer.push(arguments); }
  function event(name, fields) {
    if (!enabled || !contains(['page_view', 'store_click', 'calc_complete', 'template_complete'], name)) return;
    var params = common();
    if (name === 'store_click' && fields) {
      if (!contains(['app_store', 'google_play'], fields.store)) return;
      params.store = fields.store;
      params.destination_os = fields.store === 'app_store' ? 'ios' : 'android';
      params.cta_location = contains(['hero', 'tool_result', 'download', 'header', 'footer', 'content'], fields.cta_location) ? fields.cta_location : 'content';
      if (/^store_[1-9][0-9]?$/.test(fields.cta_position)) params.cta_position = fields.cta_position;
    }
    tag('event', name, params);
  }
  w.hugmeAnalytics = { event: event, enabled: enabled };
  if (!enabled) return;
  w.dataLayer = w.dataLayer || [];
  w.gtag = tag;
  tag('js', new Date());
  tag('set', {page_location: pageLocation, page_referrer: pageReferrer});
  tag('config', MEASUREMENT_ID, {
    allow_google_signals: false, allow_ad_personalization_signals: false,
    send_page_view: false, page_location: pageLocation, page_referrer: pageReferrer
  });
  event('page_view');
  var script = d.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
  d.head.appendChild(script);

  function ctaLocation(a) {
    if (a.closest('.hero')) return 'hero';
    if (a.closest('#result, #sheet')) return 'tool_result';
    if (a.closest('#download')) return 'download';
    if (a.closest('header')) return 'header';
    if (a.closest('footer')) return 'footer';
    return 'content';
  }
  function bind() {
    var links = d.querySelectorAll('a[href*="apps.apple.com"], a[href*="play.google.com"]');
    Array.prototype.forEach.call(links, function (a, index) {
      if (a.dataset.hugmeTracked) return;
      var url;
      try { url = new URL(a.href); } catch (_) { return; }
      var store = url.hostname === 'apps.apple.com' && /\/id6782561944\/?$/.test(url.pathname) ? 'app_store' :
        (url.hostname === 'play.google.com' && url.pathname === '/store/apps/details' && url.searchParams.get('id') === 'com.tigerlabo.hugme' ? 'google_play' : null);
      if (!store || url.protocol !== 'https:') return;
      a.dataset.hugmeTracked = '1';
      a.addEventListener('click', function () {
        event('store_click', {store: store, cta_location: ctaLocation(a), cta_position: 'store_' + (index + 1)});
      });
    });
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', bind, {once: true});
  else bind();
})(window, document);
