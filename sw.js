// Wortkarten service worker: makes the app open without internet.
// When you change index.html, raise the version number so phones pick up the update.
const VERSION = "wortkarten-v1";
const CORE = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "privacy.html",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-512.png",
  "icons/apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Google Fonts: use the saved copy, refresh it in the background.
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    event.respondWith(
      caches.open(VERSION).then(async (cache) => {
        const cached = await cache.match(req);
        const fresh = fetch(req).then((res) => { if (res.ok || res.type === "opaque") cache.put(req, res.clone()); return res; }).catch(() => cached);
        return cached || fresh;
      })
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // Pages: try the network first so updates arrive, fall back to the saved app offline.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put("index.html", copy)); return res; })
        .catch(() => caches.match("index.html"))
    );
    return;
  }

  // Everything else (icons, manifest): saved copy first.
  event.respondWith(caches.match(req).then((cached) => cached || fetch(req)));
});
