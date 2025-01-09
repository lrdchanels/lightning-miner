// app.js

import { changeLanguage, getTranslation } from './i18n.js';
import { initRouter, navigate } from './routes.js';

// Configurar el enrutador y traducir la página al cargar
(async () => {
  'use strict';

  // Detectar el idioma del navegador y traducir la página
  const browserLanguage = navigator.language.slice(0, 2); // 'es', 'en', etc.
  await changeLanguage(browserLanguage);
  
  // Inicializar el enrutador
  initRouter();

  // Exponer las funciones globalmente
  window.navigate = navigate;

})();

window.addEventListener('load', async function() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("./service-worker.js", {
        scope: "./",
        type: "module",
      });
      if (registration.installing) {
        console.log("Instalando el Service worker");
      } else if (registration.waiting) {
        console.log("Service worker instalado");
      } else if (registration.active) {
        console.log("Service worker activo");
      }
    } catch (error) {
      console.error(`Falló el registro con el ${error}`);
    }
  }
});

