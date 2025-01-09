// Variable para mantener el idioma actual y las traducciones cargadas
let currentLocale = '';
let currentTranslations = {};

// Obtener la traducción del archivo JSON
async function loadTranslation(locale) {
    try {
        const response = await fetch(`locales/${locale}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading translation:', error);
        return {};
    }
}

// Traducir el contenido de la página
async function translatePage(locale) {
    currentLocale = locale;
    currentTranslations = await loadTranslation(locale);
    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const key = element.getAttribute('data-i18n');
        if (currentTranslations[key]) {
            element.textContent = currentTranslations[key];
        }
    });
    return currentTranslations;
}

// Obtener una traducción específica para una clave dada
function getTranslation(key) {
    return currentTranslations[key] || `Missing translation for ${key}`;
}

// Cambiar de idioma manualmente
async function changeLanguage(locale) {
    await translatePage(locale);
}

// Exportar las funciones para ser utilizadas externamente
export { getTranslation, changeLanguage };
