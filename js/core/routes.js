import { config } from './config.js';

const basePath = config.routes.basePath;
const paths = config.routes.paths;
const initialPathConfig = config.routes.initialPath; // Obtener initialPath de la configuración

// Navegar a una ruta específica
async function navigate(path, params = {}) {
  // Asegurar que la ruta empieza con basePath
  if (!path.startsWith(basePath)) {
    path = basePath + path;
  }

  // Ajustar la ruta si no existe, redirigir a la página de inicio
  const relativePath = path.replace(basePath, '');
  const routeConfig = paths[relativePath];
  if (!routeConfig) {
    path = `${basePath}/`;
    updateNavLinks('/'); // Asegurar que se actualizan los ítems del menú si no existe la ruta
    return; // Terminar si no hay configuración válida para la ruta
  }

  // Actualizar la URL sin recargar la página
  window.history.pushState({}, path, window.location.origin + path);

  // Cargar dinámicamente el controlador para la ruta actual
  const controllerPath = `../controllers/${routeConfig.controller}.js`; // Usa el nombre del controlador desde config
  try {
    const module = await import(controllerPath);
    if (module && typeof module.default === 'function') {
      module.default(params); // Pasa los parámetros al módulo
    }
  } catch (error) {
    console.error('Error loading the module:', error);
  }

  updateNavLinks(relativePath); // Actualizar los ítems del menú cada vez que se navega

  // Actualizar la vista para mostrar solo la vista relevante
  Object.values(paths).forEach((route) => {
    const viewId = route.viewId;
    const view = document.getElementById(viewId);
    if (view) {
      view.classList.toggle('active', viewId === routeConfig.viewId);
    }
  });
}

// Inicializar el enrutador
function initRouter() {
  window.addEventListener('popstate', () => {
    const path = window.location.pathname.startsWith(basePath)
      ? window.location.pathname
      : `${basePath}/`;
    navigate(path);
  });

  // Verificar si initialPath está definido en la configuración y navegar
  if (initialPathConfig && paths[initialPathConfig]) {
    const fullPath = basePath + initialPathConfig;
    navigate(fullPath);
  }
}

// Función para obtener la ruta actual
function getCurrentRoute() {
  const currentPath = window.location.pathname.replace(basePath, ''); // Remover basePath para obtener la ruta relativa
  const routeConfig = paths[currentPath] || paths['/']; // Obtener la configuración de la ruta, o default a inicio si no se encuentra

  // Puede devolver la configuración completa o solo una parte relevante, como el identificador de la vista
  return  currentPath
}

// Añadir o quitar la clase 'active' a los ítems del menú de navegación
function updateNavLinks(activePath) {
  const links = document.querySelectorAll('.bottom-nav .nav-link');
  links.forEach(link => {
    const path = link.getAttribute('onclick').match(/navigate\('([^']+)'/)[1];
    if (path === activePath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}


// Exportar las funciones para ser utilizadas externamente
export { navigate, initRouter, getCurrentRoute };
