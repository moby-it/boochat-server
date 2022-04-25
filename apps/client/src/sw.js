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
self.addEventListener('push', (ev) => {
  const data = ev.data.json();
  console.log('Got push', data);
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: './assets/icon-192x192.png'
  });
});
const { precacheAndRoute } = workbox.precaching;

precacheAndRoute(self.__WB_MANIFEST);
