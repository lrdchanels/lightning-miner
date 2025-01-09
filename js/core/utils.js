import { Toasts } from './lib/toast.js';

const toasts = new Toasts({
  offsetX: 20, // 20px
  offsetY: 20, // 20px
  gap: 20, // The gap size in pixels between toasts
  width: 300, // 300px
  timing: 'ease', // See list of available CSS transition timings
  dimOld: false, // Dim old notifications while the newest notification stays highlighted
  position: 'top-right', // top-left | top-center | top-right | bottom-left | bottom-center | bottom-right
  dismissAfter: '5s' // Dismiss after 5 seconds
});

const globalErrorHandler = (error) => {
  toasts.push({
      title: 'Error',
      content: error,
      dismissAfter: '3s', // s = seconds
      style: 'error'
  });
};

const globalSuccessHandler = (message) => {
  toasts.push({
      title: 'Éxito',
      content: message,
      dismissAfter: '3s', // s = seconds
      style: 'success'
  });
};

const globalVerifiedHandler = (message) => {
  toasts.push({
      title: "Verificado",
      content: message,
      dismissAfter: '3s', // s = seconds
      style: 'verified'
  });
}

const globalDarkHandler = (message) => {
  toasts.push({
      title: 'Dark',
      content: message,
      dismissAfter: '3s', // s = seconds
      style: 'dark'
  });
}

const firebaseNotification = (payload) => {
  toasts.push({
    title: payload.data.title,
    content: payload.data.body,
    style: 'verified',
    closeButton: true
  });
}

export { globalErrorHandler, globalSuccessHandler, globalVerifiedHandler, globalDarkHandler, firebaseNotification };
