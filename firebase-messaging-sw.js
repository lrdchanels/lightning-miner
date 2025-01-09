
// firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js');

// Inicializa Firebase en el Service Worker
/* const firebaseConfig =  {
  apiKey: "AIzaSyDqbn0dqushjg4B3x6GcyKgFdYufK8eHUQ",
  authDomain: "acjrutas.firebaseapp.com",
  projectId: "acjrutas",
  storageBucket: "acjrutas.appspot.com",
  messagingSenderId: "9018664511",
  appId: "1:9018664511:web:4cbefa796c56cefaf1ba8a",
  measurementId: "G-HZ4LE5TW35"
} */

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "/rutas/icon.png"
  }; 

  return self.registration.showNotification(notificationTitle, notificationOptions);
});


self.addEventListener('notificationclick', event => {
   console.log(event)
});