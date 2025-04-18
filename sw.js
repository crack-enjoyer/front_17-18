const CACHE_NAME = 'notes-pwa-v1';
const ASSETS = [
  './',
  'index.html',
  'styles.css',
  'app.js',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cachedRes => {
      if (cachedRes) return cachedRes;
      return fetch(evt.request).then(fetchRes => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(evt.request, fetchRes.clone());
          return fetchRes;
        });
      });
    })
  );
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
});