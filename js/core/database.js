import { config } from './config.js';

const databaseName = config.database.name;
const databaseVersion = config.database.version;
const objectStores = config.database.collections;

// Variable para mantener la instancia de la base de datos
let dbInstance = null;

function openDatabase() {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      resolve(dbInstance);
      return;
    }

    const request = window.indexedDB.open(databaseName, databaseVersion);

    request.onerror = function (event) {
      console.error("Database error: " + event.target.errorCode);
      reject(event.target.error);
    };

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      Object.keys(objectStores).forEach(storeName => {
        if (!db.objectStoreNames.contains(storeName)) {
          const storeConfig = objectStores[storeName];
          const store = db.createObjectStore(storeName, {
            keyPath: storeConfig.keyPath,
            autoIncrement: storeConfig.autoIncrement
          });
          storeConfig.indices.forEach(index => {
            store.createIndex(index.name, index.keyPath, { unique: index.unique });
          });
        }
      });
    };

    request.onsuccess = function (event) {
      console.log("Database opened successfully");
      dbInstance = event.target.result;
      resolve(dbInstance);
    };
  });
}

export async function getObject(objectStoreName, id) {
	try {
			const db = await openDatabase();
			const transaction = db.transaction(objectStoreName, "readonly");
			const store = transaction.objectStore(objectStoreName);
			const request = store.get(id);

			request.onsuccess = function() {
					return request.result;
			};

			request.onerror = function(event) {
					console.error("Error getting setting: ", event.target.error.message);
					throw new Error(event.target.error);
			};

			// Esperar a que la promesa interna de la solicitud se resuelva
			return new Promise((resolve, reject) => {
					request.onsuccess = () => resolve(request.result);
					request.onerror = () => reject(request.error);
			});
	} catch (error) {
			console.error("Error:", error);
			throw error; // Lanza el error para manejo externo si es necesario
	}
}

export async function addObject(objectStoreName, objectData) {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDatabase(); // Esperar a que la base de datos esté lista
      const transaction = db.transaction(objectStoreName, "readwrite");
      const store = transaction.objectStore(objectStoreName);

      const request = store.add(objectData);

      // Manejo de éxito y errores
      request.onsuccess = () => {
        console.log("Objeto guardado o actualizado correctamente");
        resolve(); // Resuelve la promesa cuando la operación es exitosa
      };

      request.onerror = (event) => {
        console.error("Error al guardar el objeto:", event.target.error.message);
        reject(event.target.error); // Rechaza la promesa si hay un error
      };

    } catch (error) {
      console.error("Error durante la operación de la base de datos:", error);
      reject(error);
    }
  });
}

export async function setObject(objectStoreName, objectData, keyPath) {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDatabase(); // Espera a que la base de datos esté lista
      const transaction = db.transaction(objectStoreName, "readwrite");
      const store = transaction.objectStore(objectStoreName);

      // Si se proporciona un keyPath y la clave no está en objectData, agrégala al objeto
      if (keyPath !== undefined && !objectData.hasOwnProperty(store.keyPath)) {
        objectData[store.keyPath] = keyPath;
      }

      // Realiza la operación de 'put' sin un parámetro de clave separado
      const request = store.put(objectData);

      request.onsuccess = () => {
        console.log("Object set successfully");
        resolve(); // Resuelve la promesa cuando la operación es exitosa
      };

      request.onerror = (event) => {
        console.error("Error setting object:", event.target.error.message);
        reject(event.target.error); // Rechaza la promesa si hay un error
      };
    } catch (error) {
      console.error("Error during database operation:", error);
      reject(error);
    }
  });
}


export async function deleteObject(objectStoreName, id) {
  return new Promise(async (resolve, reject) => {
      try {
          const db = await openDatabase(); // Espera a que la base de datos esté lista
          const transaction = db.transaction(objectStoreName, "readwrite");
          const store = transaction.objectStore(objectStoreName);

          const request = store.delete(id);

          request.onsuccess = () => {
              console.log("Object deleted successfully");
              resolve(); // Resuelve la promesa cuando la operación es exitosa
          };

          request.onerror = (event) => {
              console.error("Error deleting object:", event.target.error.message);
              reject(event.target.error); // Rechaza la promesa si hay un error
          };
      } catch (error) {
          console.error("Error during database operation:", error);
          reject(error);
      }
  });
}

export async function clearObject(objectStoreName) {
  return new Promise(async (resolve, reject) => {
      try {
          const db = await openDatabase(); // Espera a que la base de datos esté lista
          const transaction = db.transaction(objectStoreName, "readwrite");
          const store = transaction.objectStore(objectStoreName);

          const request = store.clear();

          request.onsuccess = () => {
              console.log("Object cleared successfully");
              resolve(); // Resuelve la promesa cuando la operación es exitosa
          };

          request.onerror = (event) => {
              console.error("Error clearing object:", event.target.error.message);
              reject(event.target.error); // Rechaza la promesa si hay un error
          };
      } catch (error) {
          console.error("Error during database operation:", error);
          reject(error);
      }
  });
}
