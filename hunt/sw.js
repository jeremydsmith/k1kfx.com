// Fox Pursuit moved to https://hunt.k1kfx.com/foxpursuit/.
// This replaces the old offline worker on k1kfx.com/hunt/: it clears the old cached app, removes itself,
// and reloads any open page so it reaches the redirect to the new address.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) await caches.delete(key);
    await self.registration.unregister();
    for (const client of await self.clients.matchAll({ type: 'window' })) client.navigate(client.url);
  })());
});
