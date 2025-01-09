// js/firebaseNotifications.js
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging.js";
import { app } from './firebaseConfig.js';

const messaging = getMessaging(app);

// Solicita permiso al usuario para recibir notificaciones push
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log("Permiso de notificaciones concedido.");
      return true;
    } else {
      console.warn("Permiso de notificaciones denegado.");
      return false;
    }
  } catch (error) {
    console.error("Error al solicitar permiso de notificación:", error);
    return false;
  }
};

// Obtiene el token FCM del dispositivo y especifica el Service Worker
export const getDeviceToken = async () => {
  try {

    const registration = await navigator.serviceWorker.register('./firebase-messaging-sw.js');
    const currentToken = await getToken(messaging, {
      vapidKey: 'BNfOjuuXKhdqoaiBKcbiORGTwrjrnWBOxBZ3ECdJaFsuCLRK9aNyDv_nzmss9WCPyljPEBi7sG02Ilh3vORDegI',
      serviceWorkerRegistration: registration
    });

    if (currentToken) {
      return currentToken;
    } else {
      console.warn("No se pudo obtener el token del dispositivo.");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el token del dispositivo:", error);
    return null;
  }
};

// Maneja mensajes cuando la aplicación está en primer plano
// Modifica onMessageListener para usar un callback en lugar de una promesa
export const onMessageListener = (callback) => {
  onMessage(messaging, (payload) => {
    callback(payload); // Llama al callback cada vez que llega una notificación
  });
};

