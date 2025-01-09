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
      '/rutas/sounds/beep.mp3',
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
          { name: 'token', keyPath: 'token', unique: true },
          { name: 'password', keyPath: 'password', unique: false },
          { name: 'whatsapp', keyPath: 'whatsapp', unique: false },
          { name: 'nomOperari', keyPath: 'nomOperari', unique: false },
          { name: 'codiSeccio', keyPath: 'codiSeccio', unique: false }

        ]
      }
    }
  },
  api: {
    baseURL: 'https://bugasys.lavanderialosmocanes.com/rutas',
  },
  routes: {
    basePath: '/foxy-mobile',
    //initialPath: '/settings', // Ruta inicial opcional
    initialPath: '', // Ruta inicial opcional
    paths: {
      '/ruta': {
        viewId: 'ruta',
        controller: 'ruta' // Especifica el nombre del archivo del controlador
      }
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
