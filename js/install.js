// main.js

let installPrompt = null;
const installButton = document.querySelector("#installButton");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  installButton.removeAttribute("hidden");
});

installButton.addEventListener("click", async () => {
  if (!installPrompt) {
    return;
  }
  const result = await installPrompt.prompt();
  console.log(`Install prompt was: ${result.outcome}`);
  disableInAppInstallPrompt();
});

function disableInAppInstallPrompt() {
  installPrompt = null;
  installButton.setAttribute("hidden", "");
}

// Funcion para leer un archivo JSON y devolver tres valores específicos
function leerArchivoJSON(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status == "200") {
          var datos = JSON.parse(xhr.responseText);
          var short_name = datos.short_name;
          var name = datos.name;
          var icon = datos.icons[0].src; // Suponiendo que el objeto 'icons' es un array y quieres tomar el primer ícono
          callback(short_name, name, icon);
      }
  };
  xhr.send(null);
}

// Llamada a la función para leer el archivo JSON y usar los valores devueltos
leerArchivoJSON('manifest.json', function(short_name, name, icon) {
  document.getElementById("shortNameElement").innerText = short_name;
  document.getElementById("footerName").innerText = short_name;
  document.getElementById("nameElement").innerText = name;
  document.getElementById("iconElement").src = icon;
}); 