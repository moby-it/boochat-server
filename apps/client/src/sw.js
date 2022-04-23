/* eslint-disable no-restricted-globals */
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
self.__WB_MANIFEST;

self.addEventListener('fetch', (data) => {
  console.log(data.request.url);
});
