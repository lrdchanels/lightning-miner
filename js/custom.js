import { getObject, addObject, setObject, deleteObject, clearObject } from './core/database.js';
import { navigate, getCurrentRoute } from './core/routes.js';
import { changeLanguage, getTranslation } from './core/i18n.js';
import { comprovarCredenciales, getUser, getRutas, getVehiculos, getDetallRuta, enviarOrden, enviarCoordenadas, finalizarRuta, enviarFirebaseToken } from './endpoints.js';
import { globalErrorHandler, globalSuccessHandler, globalVerifiedHandler, globalDarkHandler, firebaseNotification } from './core/utils.js';
import { getLocation } from './core/device-utils.js';
import { requestNotificationPermission, getDeviceToken, onMessageListener } from './core/firebaseNotifications.js';

// Configuración de la aplicación