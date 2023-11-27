// grafica.js
document.addEventListener("DOMContentLoaded", function() {
  var ctx = document.getElementById('lineChart').getContext('2d');

  var labels = [];
  var btcPrices = [];
  var ethPrices = [];


  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    if (item.crypto_name === 'BTC') {
      btcPrices.push(item.crypto_price);
      labels.push(item.date_time); 

    } else if (item.crypto_name === 'ETH') {
      ethPrices.push(item.crypto_price);
    }
  }

  var lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      
      labels: labels,
      datasets: [
        {
          label: 'BTC',
          data: btcPrices,
          borderColor: 'red',
          backgroundColor:'rgba(255, 80, 132, 0.5)',
          borderWidth: 1,
        },
        {
          label: 'ETH',
          data: ethPrices,
          borderColor: 'blue',
          backgroundColor:'rgba(0, 0, 255, 0.5)',
          borderWidth: 1,
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        },
        title: {
          display: true,
          text: 'Price'
      }
      },
      responsive: true, 
      maintainAspectRatio: false 
    }
  });
});
