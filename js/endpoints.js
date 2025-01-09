// endpoints.js

import { request } from './core/api.js';

// Funciones para el endpoint de usuarios
async function comprovarCredenciales(token) {
  return request(`/usrok.php?token=${token}`);
}

export {
  comprovarCredenciales
};
