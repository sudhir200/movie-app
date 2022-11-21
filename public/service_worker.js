// eslint-disable-next-line no-undef

// eslint-disable-next-line no-undef
importScripts("./workbox-sw.js");
// eslint-disable-next-line no-undef
workbox?.setConfig({ debug: false });
// Cache page navigations (html) with a Network First strategy
// eslint-disable-next-line no-undef
workbox?.routing.registerRoute(
  ({ request }) => request.mode === "navigate",
  // Use a Network First caching strategy
  // eslint-disable-next-line no-undef
  new workbox.strategies.NetworkFirst({
    // Put all cached files in a cache named 'pages'
    cacheName: "pages",
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      // eslint-disable-next-line no-undef
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  })
);

// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
// eslint-disable-next-line no-undef
workbox.routing.registerRoute(
  // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
  ({ request }) =>
    request.destination === "style" ||
    request.destination === "font" ||
    request.destination === "script" ||
    request.destination === "worker",
  // Use a Stale While Revalidate caching strategy
  // eslint-disable-next-line no-undef
  new workbox.strategies.StaleWhileRevalidate({
    // Put all cached files in a cache named 'assets'
    cacheName: "assets",
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      // eslint-disable-next-line no-undef
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  })
);

// Cache images with a Cache First strategy
workbox.routing.registerRoute(
  // Check to see if the request's destination is style for an image
  ({ request }) => request.destination === "image",
  // Use a Cache First caching strategy
  new workbox.strategies.CacheFirst({
    // Put all cached files in a cache named 'images'
    cacheName: "images",
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      }),
      // Don't cache more than 50 items, and expire them after 30 days
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
      }),
    ],
  })
);
workbox.routing.registerRoute(
  // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
  ({ request }) => request.url.includes("/api/v2/"),
  // Use a Stale While Revalidate caching strategy
  // eslint-disable-next-line no-undef
  new workbox.strategies.StaleWhileRevalidate({
    // Put all cached files in a cache named 'assets'
    cacheName: "apis",
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      // eslint-disable-next-line no-undef
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  })
);
