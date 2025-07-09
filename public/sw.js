// Cache names for different types of content
const STATIC_CACHE = 'gov-scheme-static-v1';
const DYNAMIC_CACHE = 'gov-scheme-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/schemes',
  '/about',
  '/contact',
  '/faq',
  '/profile',
  '/notifications',
  '/accessibility',
  '/terms',
  '/auth/signin',
  '/auth/register',
  '/1-full.webp',
  '/2-full.webp',
  '/3-full.webp',
  '/4-full.webp',
  '/5-full.webp',
  '/6-full.webp',
  '/contact.jpg',
  '/faq.jpg',
  '/sign-in.jpg',
  '/notification-bg.jpg',
  '/bonus.png',
  '/candidates.png',
  '/meticulous.png',
  '/sallubhai.jpg',
  '/zycoon.jpeg',
  '/Right-Arrow-unscreen.gif',
  '/Right-Arrow-unscreen1.png',
  '/loader.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Error caching static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Handle different types of requests
  if (url.pathname.startsWith('/api/')) {
    // API requests - cache with network-first strategy
    event.respondWith(handleApiRequest(request));
  } else if (isStaticAsset(url.pathname)) {
    // Static assets - cache-first strategy
    event.respondWith(handleStaticAsset(request));
  } else {
    // Other requests - network-first strategy
    event.respondWith(handleOtherRequest(request));
  }
});

// Handle API requests with network-first strategy
async function handleApiRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache the response
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline response
    return new Response(
      JSON.stringify({ error: 'Network error, please try again later' }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handle static assets with cache-first strategy
async function handleStaticAsset(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    // Return offline page for navigation requests
    if (request.destination === 'document') {
      return caches.match('/');
    }
    throw new Error('Failed to fetch static asset');
  }
}

// Handle other requests with network-first strategy
async function handleOtherRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.destination === 'document') {
      return caches.match('/');
    }
    
    throw new Error('Failed to fetch request');
  }
}

// Check if URL is a static asset
function isStaticAsset(pathname) {
  return STATIC_ASSETS.includes(pathname) ||
         pathname.startsWith('/_next/static/') ||
         pathname.endsWith('.webp') ||
         pathname.endsWith('.png') ||
         pathname.endsWith('.jpg') ||
         pathname.endsWith('.jpeg') ||
         pathname.endsWith('.gif') ||
         pathname.endsWith('.json') ||
         pathname.endsWith('.css') ||
         pathname.endsWith('.js');
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Handle any pending offline actions
    console.log('Performing background sync...');
    // Add your background sync logic here
  } catch {
    console.error('Background sync failed');
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New government scheme available!',
    icon: '/bonus.png',
    badge: '/bonus.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore Schemes',
        icon: '/bonus.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/bonus.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Government Schemes', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/schemes')
    );
  }
}); 