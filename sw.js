// 版管理つきキャッシュ（オフライン対応）
// ・画面（index.html など）: ネットワーク優先。圏外ならキャッシュ
// ・data/*.json: キャッシュを即返し、裏で最新版を取得して差し替え（次回起動で反映）
// ・Google Fonts: キャッシュ優先
// index.html の APP_VER と、この VER は必ず同じ値にする
var VER = 'v9';
var CACHE = 'shindan1-' + VER;
var SHELL = [
  './', 'index.html', 'manifest.json',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png',
  'data/syllabus.json', 'data/past.json',
  'data/q_keizai.json', 'data/q_zaimu.json', 'data/q_kigyo.json', 'data/q_unei.json',
  'data/q_homu.json', 'data/q_joho.json', 'data/q_chusho.json',
  'data/t_kigyo.json', 'data/t_unei.json', 'data/t_zaimu.json'
];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(SHELL.map(function (u) { return c.add(new Request(u, { cache: 'reload' })).catch(function () {}); }));
  }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf('shindan1-') === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

function putCache(req, res) {
  if (res && (res.ok || res.type === 'opaque')) {
    var copy = res.clone();
    caches.open(CACHE).then(function (c) { c.put(req, copy); });
  }
  return res;
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);

  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) { return putCache(req, res); });
    }));
    return;
  }

  if (url.origin !== self.location.origin) return;

  if (url.pathname.indexOf('/data/') >= 0 && url.pathname.slice(-5) === '.json') {
    e.respondWith(caches.open(CACHE).then(function (c) {
      return c.match(req, { ignoreSearch: true }).then(function (hit) {
        var net = fetch(req).then(function (res) { return putCache(req, res); }).catch(function () { return hit; });
        return hit || net;
      });
    }));
    return;
  }

  e.respondWith(fetch(req).then(function (res) { return putCache(req, res); }).catch(function () {
    return caches.match(req, { ignoreSearch: true }).then(function (hit) {
      if (hit) return hit;
      return req.mode === 'navigate' ? caches.match('index.html') : undefined;
    });
  }));
});
