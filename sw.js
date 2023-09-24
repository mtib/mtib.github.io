// eslint-disable-next-line no-undef
const t=process.env.BUILD_DATE||"dev",e=async(e,a)=>{let n=await caches.open(t);await n.put(e,a)},a=async t=>{let a=await caches.match(t),n=async()=>{let a=await fetch(t);return a.ok&&new URL(a.url).protocol.startsWith("http")&&e(t,a.clone()),a},i=n();return a||await i};async function n(){// eslint-disable-next-line no-undef
skipWaiting()}async function i(){let e=await caches.keys();await Promise.all(e.map(e=>e!==t&&caches.delete(e)))}self.addEventListener("fetch",e=>{"dev"!==t&&e.respondWith(a(e.request))}),addEventListener("install",t=>t.waitUntil(n())),addEventListener("activate",t=>t.waitUntil(i()));//# sourceMappingURL=sw.js.map

//# sourceMappingURL=sw.js.map
