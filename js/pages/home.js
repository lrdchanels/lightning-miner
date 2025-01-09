fetchData();

function fetchData() {
	fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
	.then(response => response.json())
	.then(data => {
			const btcPrice = document.getElementById('btc-price');
			const btcChange = document.getElementById('btc-change');

			// Actualizar el precio de Bitcoin
			btcPrice.textContent = `$${data.market_data.current_price.usd.toLocaleString()}`;

			// Calcular y actualizar el cambio en las últimas 24 horas
			const change = data.market_data.price_change_percentage_24h;
			const changeFormatted = change.toFixed(2) + '%';
			btcChange.textContent = changeFormatted;
			btcChange.className = 'crypto-change ' + (change >= 0 ? 'up' : 'down');
			
			// Añadir icono de flecha
			const arrowIcon = document.createElement('i');
			arrowIcon.className = change >= 0 ? 'bi bi-arrow-up-circle-fill' : 'bi bi-arrow-down-circle-fill';
			btcChange.appendChild(arrowIcon);
	})
	.catch(error => {
			console.error('Error fetching Bitcoin data:', error);
	});
}

document.addEventListener("DOMContentLoaded", () => {
  const hashrateDisplay = document.getElementById('hashrate-value');
  let currentHashrate = parseFloat(hashrateDisplay.textContent);

  // Supongamos que este valor es el incremento por segundo basado en el hashrate del usuario
  const hashrateIncrement = 0.00000001; // Este valor deberías calcularlo basado en el hashrate real del usuario

  setInterval(() => {
      currentHashrate += hashrateIncrement;
      hashrateDisplay.textContent = currentHashrate.toFixed(10);
  }, 1000); // Actualiza cada segundo
});
