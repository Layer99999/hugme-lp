/* Fixed YouTube profile destinations. No arbitrary query/referrer values are sent. */
(function (w, d) {
  'use strict';
  if (w.__hugmeRelayStarted) return;
  w.__hugmeRelayStarted = true;
  var HOST = 'hugme.tigerlabo.com';
  var ID = 'G-G57V70ZJ66';
  var routes = {
    '/go/youtube/lp/': {
      destination: 'lp', event: 'youtube_link_lp',
      url: 'https://hugme.tigerlabo.com/?utm_source=youtube&utm_medium=channel_profile&utm_campaign=profile_links&utm_content=lp'
    },
    '/go/youtube/ios/': {
      destination: 'ios', event: 'youtube_link_ios',
      url: 'https://apps.apple.com/jp/app/id6782561944?pt=129057504&ct=youtubeprofile&mt=8'
    },
    '/go/youtube/android/': {
      destination: 'android', event: 'youtube_link_android',
      url: 'https://play.google.com/store/apps/details?id=com.tigerlabo.hugme&referrer=utm_source%3Dyoutube%26utm_medium%3Dchannel_profile%26utm_campaign%3Dprofile_links%26utm_content%3Dandroid'
    }
  };
  var path = w.location.pathname.replace(/\/index\.html$/, '/');
  var route = routes[path];
  if (!route) return;
  // Local previews and the explicit verification URL never send analytics.
  if (w.location.protocol !== 'https:' || w.location.hostname !== HOST || w.location.port) return;
  var moved = false;
  function go() {
    if (moved) return;
    moved = true;
    w.location.replace(route.url);
  }
  if (new URLSearchParams(w.location.search).get('verify') === '1') {
    if (route.destination === 'lp') route = Object.assign({}, route, {url: route.url + '&verify=1'});
    go();
    return;
  }
  // Navigation still completes when a blocker or network failure prevents measurement.
  w.setTimeout(go, 1200);
  var page = 'https://' + HOST + path + '?utm_source=youtube&utm_medium=channel_profile&utm_campaign=profile_links&utm_content=' + route.destination;
  var referrer = '';
  try {
    var ref = new URL(d.referrer);
    if (ref.protocol === 'https:' || ref.protocol === 'http:') referrer = ref.origin + '/';
  } catch (_) { /* No referrer. */ }
  w.dataLayer = w.dataLayer || [];
  function tag() { w.dataLayer.push(arguments); }
  tag('js', new Date());
  tag('set', {page_location: page, page_referrer: referrer});
  tag('config', ID, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: page, page_referrer: referrer
  });
  // A relay arrival is distinct from LP visits, LP store-button clicks and downloads.
  tag('event', route.event, {
    send_to: ID,
    page_location: page, page_referrer: referrer,
    entry_source: 'youtube', entry_medium: 'channel_profile',
    entry_campaign: 'profile_links', entry_content: route.destination,
    transport_type: 'beacon', event_callback: go, event_timeout: 1000
  });
  var script = d.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
  script.onerror = go;
  d.head.appendChild(script);
})(window, document);
