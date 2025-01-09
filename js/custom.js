import { getObject, addObject, setObject, deleteObject, clearObject } from './core/database.js';
import { navigate, getCurrentRoute } from './core/routes.js';
import { changeLanguage, getTranslation } from './core/i18n.js';
// import { getUser} from './endpoints.js';
import { globalErrorHandler, globalSuccessHandler, globalVerifiedHandler, globalDarkHandler, firebaseNotification } from './core/utils.js';
import { getLocation } from './core/device-utils.js';

// Configuración de la aplicación

document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.getElementById("progress-bar");
  const splashScreen = document.getElementById("splash-screen");
  const app = document.getElementById("app");
  const loadingMessage = document.getElementById("loading-message");

  let progress = 0;

  // Messages according to progress
  function updateLoadingMessage(progress) {
      if (progress < 20) {
          loadingMessage.textContent = "Loading data...";
      } else if (progress < 40) {
          loadingMessage.textContent = "Retrieving settings...";
      } else if (progress < 60) {
          loadingMessage.textContent = "Establishing connections...";
      } else if (progress < 80) {
          loadingMessage.textContent = "Almost ready...";
      } else if (progress < 100) {
          loadingMessage.textContent = "Finalizing...";
      } else {
          loadingMessage.textContent = "Ready!";
      }
  }

  // Increment the progress bar
  const interval = setInterval(() => {
      progress += 100; // Increase progress by %
      progressBar.style.width = progress + "%";
      updateLoadingMessage(progress); // Update the loading message

      // When it reaches 100%, hide the splash screen
      if (progress >= 100) {
          clearInterval(interval);
          splashScreen.style.display = "none";
          app.style.display = "block";
      }
  }, 100); // Update every 100ms (1 second total = 10 updates)
});
