const CACHE_NAME = 'globalscript-v2';

// Senarai fail yang wajib disimpan secara offline
const ASSETS = [
  './',
  './index.html',
  './tailwindcss.js',
  './favicon.svg',
  './icon-192.png',
  './icon-512.png',
  './manifest.json',
  './thumbnail.png',   // <-- Tambahkan baris ini
  './screenshot.jpeg', // <-- Tambahkan baris ini
  // Daftarkan semua fail font tempatan anda di bawah
  './fonts/NotoSans-Regular.ttf',
  './fonts/NotoSans-Bold.ttf',
  './fonts/NotoSansArabic-Regular.ttf',
  './fonts/NotoSansJavanese-Regular.ttf',
  './fonts/NotoSansBuginese-Regular.ttf',
  './fonts/NotoSansBatak-Regular.ttf',
  './fonts/NotoSerifBalinese-Regular.ttf',
  './fonts/NotoSansSundanese-Regular.ttf',
  './fonts/NotoSansRejang-Regular.ttf',
  './fonts/NotoSansKawi-Regular.ttf',
  './fonts/NotoSansThai-Regular.ttf',
  './fonts/NotoSansJP-Regular.ttf',
  './fonts/NotoSansKR-Regular.ttf'
];

// Langkah 1: Pasang Service Worker dan simpan semua fail ke dalam Cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Langkah 2: Aktifkan SW dan padam cache versi lama jika ada kemas kini
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Langkah 3: Pintas permintaan sistem dan ambil fail terus daripada Cache (Laju & Offline)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
