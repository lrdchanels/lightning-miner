// config.js

export const config = {
  cache : {
    name: 'rutas',
    urls: [
      '/rutas/index.html',
      '/rutas/css/bootstrap.min.css',
      '/rutas/css/clockpicker.css',
      '/rutas/js/bootstrap.min.js',
      '/rutas/js/clockpicker.js',
      '/rutas/js/jquery.crypt.js',
      '/rutas/js/json2.min.js',
      '/rutas/js/localise.js',
      '/rutas/js/password.js',
      '/rutas/locales/en.json',
      '/rutas/locales/es.json'
    ]
  },
  database: {
    name: "rutas",
    version: 1,
    collections: {
      settings: {
        keyPath: 'id',
        autoIncrement: true,
        indices: [
          { name: 'user', keyPath: 'user', unique: false },
        ]
      }
    }
  },
  api: {
    baseURL: 'https://exemple.com/exemple',
  },
  routes: {
    basePath: '/lightning-miner',
    initialPath: '/home', // Ruta inicial opcional
    paths: {
      '/home': {
        viewId: 'home',
        controller: 'home' // Especifica el nombre del archivo del controlador
      },
      '/earn': {
        viewId: 'earn',
        controller: 'earn' // Especifica el nombre del archivo del controlador
      },
      '/notifications': {
        viewId: 'notifications',
        controller: 'notifications' // Especifica el nombre del archivo del controlador
      },
      '/profile': {
        viewId: 'profile',
        controller: 'profile' // Especifica el nombre del archivo del controlador
      },
    }
  },
  /* firebaseConfig: {
    apiKey: "AIzaSyDqbn0dqushjg4B3x6GcyKgFdYufK8eHUQ",
    authDomain: "acjrutas.firebaseapp.com",
    projectId: "acjrutas",
    storageBucket: "acjrutas.appspot.com",
    messagingSenderId: "9018664511",
    appId: "1:9018664511:web:4cbefa796c56cefaf1ba8a",
    measurementId: "G-HZ4LE5TW35"
  } */
};
