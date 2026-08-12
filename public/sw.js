self.options = {
    "domain": "5gvci.com",
    "zoneId": 11560378
};
self.lary = "";
importScripts('https://5gvci.com/act/files/service-worker.min.js?r=sw');

const LEGACY_CACHE_PREFIXES = ['video-cache-'];

self.addEventListener('install', () => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => Promise.all(
                cacheNames
                    .filter((cacheName) => LEGACY_CACHE_PREFIXES.some((prefix) => cacheName.startsWith(prefix)))
                    .map((cacheName) => caches.delete(cacheName))
            ))
            .then(() => self.clients.claim())
    );
});
