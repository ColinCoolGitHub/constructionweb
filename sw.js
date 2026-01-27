// Service Worker for Corbo Digital - Image Caching
const CACHE_NAME = 'corbo-digital-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/app.css',
    '/app.js',
    '/project1.jpg',
    '/project2.jpg',
    '/project3.jpg',
    '/project4.jpg',
    '/fullImage.jpg',
    '/Corbo_Digital-1.png'
];

// Install - Cache all assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching assets...');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate - Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch - Cache-first strategy for images, network-first for others
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    // Cache-first for images (they're large and don't change often)
    if (event.request.destination === 'image' || 
        url.pathname.endsWith('.jpg') || 
        url.pathname.endsWith('.png')) {
        event.respondWith(
            caches.match(event.request)
                .then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    return fetch(event.request).then((response) => {
                        // Cache the new image
                        if (response.status === 200) {
                            const responseClone = response.clone();
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(event.request, responseClone);
                            });
                        }
                        return response;
                    });
                })
        );
    } else {
        // Network-first for other resources
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Cache successful responses
                    if (response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    // Fallback to cache if offline
                    return caches.match(event.request);
                })
        );
    }
});
