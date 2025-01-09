// device-utils.js

// **Función para abrir la linterna**
export function toggleFlashlight() {
  if (!('mediaDevices' in navigator)) {
    console.error("Flashlight not supported on this device");
    return;
  }

  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: 'environment' } })
    .then((stream) => {
      const track = stream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(track);
      imageCapture.getPhotoCapabilities().then(() => {
        const settings = track.getSettings();
        const flashlightEnabled = settings.torch || false;
        track.applyConstraints({
          advanced: [{ torch: !flashlightEnabled }]
        });
      });
    })
    .catch((error) => console.error("Error accessing flashlight:", error));
}

// **Función para abrir la cámara**
export async function openCamera({ facingMode = 'user', width = 640, height = 480 } = {}) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode, width, height }
    });
    const videoElement = document.createElement('video');
    videoElement.srcObject = stream;
    videoElement.setAttribute('autoplay', 'true');
    videoElement.setAttribute('playsinline', 'true');
    document.body.appendChild(videoElement);
    return videoElement;
  } catch (error) {
    console.error("Error accessing camera:", error);
  }
}

// **Función para activar la vibración**
export function vibrate(pattern = [200, 100, 200]) {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  } else {
    console.error("Vibration API not supported on this device");
  }
}

// **Función para obtener la geolocalización con solicitud de permiso**
export function getLocation(options = {}) {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error("Geolocation API not supported on this device."));
    } else {
      navigator.permissions.query({name: 'geolocation'}).then(permissionStatus => {
        if (permissionStatus.state === 'prompt' || permissionStatus.state === 'denied') {
          navigator.geolocation.getCurrentPosition(
            resolve,
            error => handleGeoError(error, reject), // Manejo de error específico
            options
          );
        } else {
          navigator.geolocation.getCurrentPosition(
            resolve,
            error => handleGeoError(error, reject), // Manejo de error específico
            options
          );
        }
      }).catch(error => {
        reject(new Error("Error checking geolocation permission: " + error));
      });
    }
  });
}

function handleGeoError(error, reject) {
  console.error("Geolocation error occurred. Error code: " + error.code + ". Message: " + error.message);
  switch (error.code) {
    case error.PERMISSION_DENIED:
      reject(new Error("User denied the request for Geolocation."));
      break;
    case error.POSITION_UNAVAILABLE:
      reject(new Error("Location information is unavailable."));
      break;
    case error.TIMEOUT:
      reject(new Error("The request to get user location timed out."));
      break;
    default:
      reject(new Error("An unknown error occurred."));
      break;
  }
}


// **Función para enviar mensajes SMS**
export function sendSMS(number, message) {
  if ('sms' in navigator) {
    navigator.sms.send(number, message).catch((error) => {
      console.error("Error sending SMS:", error);
    });
  } else {
    console.error("SMS API not supported on this device");
  }
}

// **Función para acceder a la batería**
export function getBatteryStatus() {
  return navigator.getBattery
    ? navigator.getBattery()
    : Promise.reject("Battery API not supported on this device");
}

// **Función para hacer que el dispositivo hable**
export function speak(text, lang = 'en-US') {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  synth.speak(utterance);
}

// **Función para abrir el marcador**
export function dialNumber(number) {
  window.location.href = `tel:${number}`;
}

// **Función para abrir el correo**
export function sendEmail(email, subject = '', body = '') {
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// **Función para acceder a la lista de contactos**
export async function getContacts() {
  if ('contacts' in navigator && 'select' in navigator.contacts) {
    try {
      const contacts = await navigator.contacts.select(['name', 'tel'], { multiple: true });
      return contacts;
    } catch (error) {
      console.error("Error accessing contacts:", error);
    }
  } else {
    console.error("Contacts API not supported on this device");
  }
}

// **Función para obtener el estado de la red**
export function getNetworkStatus() {
  return navigator.onLine ? 'online' : 'offline';
}

// **Función para detectar cambios en el estado de la red**
export function onNetworkChange(callback) {
  window.addEventListener('online', () => callback('online'));
  window.addEventListener('offline', () => callback('offline'));
}

// **Función para detectar cambios en la orientación**
export function onOrientationChange(callback) {
  window.addEventListener('orientationchange', () => {
    callback(window.orientation);
  });
}

// **Función para detectar cambios en los sensores de movimiento**
export function onMotionChange(callback) {
  window.addEventListener('devicemotion', (event) => {
    callback({
      acceleration: event.acceleration,
      rotationRate: event.rotationRate
    });
  });
}

// **Función para acceder al almacenamiento local**
export function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

// **Eventos personalizados**
export function triggerCustomEvent(eventName, detail = {}) {
  const event = new CustomEvent(eventName, { detail });
  document.dispatchEvent(event);
}

export function onCustomEvent(eventName, callback) {
  document.addEventListener(eventName, (event) => {
    callback(event.detail);
  });
}
