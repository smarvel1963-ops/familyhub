/* SAVE AS: sw.js · LOCATION: C:/MarvelApps/familyhub/sw.js
 * Family Hub's own offline worker (scope /familyhub/) - installable, opens
 * offline, shows calendar, chore, pickup and birthday reminders. The app code is the shared Hub
 * engine in ../dayhub/, cached here too. NETWORK FIRST (same rule as Day Hub's
 * sw.js): online = always the newest files, the cache is only the offline fallback.
 * Updates are announced by ../dayhub/version.json - this file rarely changes.
 * v2 (11/07, Phase A): the fixed worker the other Hubs use (cruisehub-v8 / healthhub-v4) - it clears ONLY its own old
 * caches (never another Hub's offline copy), reads its own copy first when offline, and never stores the update check.
 * Plus Family Hub's new files: family.css and the part files (v3: familysync.js). Art is cached the first time it is shown.
 * Firebase (sharing) is an outside service: always live, never cached here. */
const CACHE = "familyhub-v3";
const SHELL = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png", "icon-180.png",
  "../dayhub/styles.css", "../dayhub/family.css", "../dayhub/features.js", "../dayhub/app.js", "../dayhub/scenes.js", "../dayhub/cruise.js", "../dayhub/shell.js", "../dayhub/trip.js", "../dayhub/ships.js",
  "../dayhub/family.js", "../dayhub/familymsg.js", "../dayhub/familytree.js", "../dayhub/familyphotos.js", "../dayhub/familylife.js", "../dayhub/familysync.js", "../dayhub/ui.js", "../dayhub/privacy.html", "../dayhub/terms.html"];
self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
});
self.addEventListener("activate", e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("familyhub-") && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (u.pathname.endsWith("/version.json") && e.request.method === "GET") return;   // the update check is always live and never piles up in the cache
  if (e.request.cache === "reload" && e.request.destination === "") return;   // applyUpdate's fresh fetch: a failure must really fail, and half a set of new files stays out of the offline copy
  if (u.origin !== location.origin || e.request.method !== "GET") return;   // outside services: always live
  e.respondWith(fetch(e.request).then(r => {
    if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }   // never cache an error page
    return r;
  }).catch(() => caches.open(CACHE).then(c => c.match(e.request, { ignoreSearch: true })).then(r => r || caches.match(e.request, { ignoreSearch: true }))));   // offline: our own copy first, because every Hub's cache holds ../dayhub/ files and some are old
});
// Tapping a reminder opens Family Hub (or brings the open one to the front).
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(cs => {
    for (const c of cs) if ("focus" in c && new URL(c.url).pathname.includes("/familyhub/")) return c.focus();
    return self.clients.openWindow("./");
  }));
});
