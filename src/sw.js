// eslint-disable-next-line no-undef
const version = process.env.BUILD_DATE || 'dev';

const putInCache = async (request, response) => {
  const cache = await caches.open(version);
  await cache.put(request, response);
};

const staleWhileRevalidate = async (request) => {
  const responseFromCache = await caches.match(request);
  const getFromNetworkAndAddToCache = async () => {
    const responseFromNetwork = await fetch(request);
    if (responseFromNetwork.ok && new URL(responseFromNetwork.url).protocol.startsWith('http')) {
      putInCache(request, responseFromNetwork.clone());
    }
    return responseFromNetwork;
  };
  const responseFromNetworkPromise = getFromNetworkAndAddToCache();
  if (responseFromCache) {
    return responseFromCache;
  }
  return await responseFromNetworkPromise;
};

self.addEventListener("fetch", (event) => {
  if (version !== 'dev') {
    event.respondWith(staleWhileRevalidate(event.request));
  }
});

async function install() {
  // eslint-disable-next-line no-undef
  skipWaiting();
}
addEventListener('install', e => e.waitUntil(install()));

async function activate() {
  const keys = await caches.keys();
  await Promise.all(
    keys.map(key => key !== version && caches.delete(key))
  );
}
addEventListener('activate', e => e.waitUntil(activate()));
