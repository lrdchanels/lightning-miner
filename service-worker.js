// Importa la configuración
import { config } from './js/core/config.js';

// Configuración del caché
const CACHE_NAME = config.cache.name;
let urlsToCache = config.cache.urls;

// Convierte rutas relativas a URLs absolutas para el caché
urlsToCache = urlsToCache.map((relativePath) => new URL(relativePath, location.href).toString());

// Evento de instalación del caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Error al agregar recursos al caché:', error);
      })
  );
});

// Evento fetch para interceptar y responder con datos de caché
self.addEventListener('fetch', (event) => {
  if (urlsToCache.includes(event.request.url)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        
        return fetch(event.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          
          return networkResponse;
        });
      })
    );
  }
});

// Evento activate para limpiar el caché obsoleto
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => !cacheWhitelist.includes(cacheName))
          .map((cacheName) => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});
