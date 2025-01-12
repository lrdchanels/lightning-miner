import {globalErrorHandler, globalSuccessHandler} from '../core/utils.js';

$('#submitWithdrawModal').click(function(e) {
  e.preventDefault();
  let address = $('#address-input').val(); // address proporcionada por l'usuari.
  let amount  = $('#amount-input').val(); // quantitat
  const apiKey = '6e662d2e-ed33-49f4-9c61-f072f04533e0'; // APIkey.

  fetch('https://api.opennode.com/v2/withdrawals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey, // Autenticación con la API.
      },
      body: JSON.stringify({
        type: 'ln',          // Tipo de retiro: Lightning.
        amount: Number(amount),      // Cantidad a retirar.
        address: address,    // Dirección de la factura.
        callback_url : "http://lightning-miner.com", // URL de callback
      }),
    })
  .then(response => response.json())
  .then(data => {
      if (data.message) {
        globalErrorHandler(data.message);
      } else {
        globalSuccessHandler('Withdrawal completed successfully');

        var modalElement = document.getElementById('withdrawModal');
        var modalInstance = bootstrap.Modal.getInstance(modalElement); // Recuperar una instancia del modal
        modalInstance.hide(); // Ocultar el modal
      }
  })
  .catch(error => console.error('Error al conectar con OpenNode:', error));
});