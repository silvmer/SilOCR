const CACHE_NAME = 'silvocr-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js'
];

// 1. Install Phase: Save files to the browser's cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SilvOCR: Caching shell assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Fetch Phase: Serve files from cache if offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return the cached version if found, otherwise perform a normal network fetch
      return response || fetch(event.request);
    })
  );

});
