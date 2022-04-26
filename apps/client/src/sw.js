/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

self.addEventListener('install', () => {
  console.log('clearing cache...');
  caches.keys().then((cacheNames) => {
    cacheNames.forEach((cacheName) => {
      caches.delete(cacheName);
    });
  });
});

const { precacheAndRoute } = workbox.precaching;

precacheAndRoute(self.__WB_MANIFEST);
