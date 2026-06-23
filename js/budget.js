const budgetDays = document.getElementById('budgetDays');
const hotelCategory = document.getElementById('hotelCategory');
const transportType = document.getElementById('transportType');
const foodBudget = document.getElementById('foodBudget');
const calculateBudget = document.getElementById('calculateBudget');
const accommodationCost = document.getElementById('accommodationCost');
const transportCost = document.getElementById('transportCost');
const foodCost = document.getElementById('foodCost');
const totalBudget = document.getElementById('totalBudget');
const budgetChart = document.getElementById('budgetChart');
let chartInstance;

function parseNumber(value) {
  return Number(value) || 0;
}

function calculateCosts() {
  const days = parseNumber(budgetDays.value);
  const hotel = hotelCategory.value;
  const transport = transportType.value;
  const food = foodBudget.value;

  const hotelRates = { standard: 4500, premium: 8200, luxury: 14800 };
  const transportRates = { economy: 1200, comfort: 2400, private: 4200 };
  const foodRates = { economy: 800, balanced: 1400, premium: 2200 };

  const accommodation = days * hotelRates[hotel];
  const transportTotal = days * transportRates[transport];
  const foodTotal = days * foodRates[food];
  const total = accommodation + transportTotal + foodTotal;

  accommodationCost.textContent = `₹${accommodation.toLocaleString()}`;
  transportCost.textContent = `₹${transportTotal.toLocaleString()}`;
  foodCost.textContent = `₹${foodTotal.toLocaleString()}`;
  totalBudget.textContent = `₹${total.toLocaleString()}`;

  renderBudgetChart(accommodation, transportTotal, foodTotal);
}

function renderBudgetChart(accommodation, transportTotal, foodTotal) {
  const data = {
    labels: ['Accommodation', 'Transport', 'Food'],
    datasets: [{
      data: [accommodation, transportTotal, foodTotal],
      backgroundColor: ['rgba(37, 99, 235, 0.82)', 'rgba(6, 182, 212, 0.8)', 'rgba(245, 158, 11, 0.86)'],
      borderWidth: 0
    }]
  };

  if (chartInstance) {
    chartInstance.data = data;
    chartInstance.update();
    return;
  }

  chartInstance = new Chart(budgetChart, {
    type: 'doughnut',
    data,
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom', labels: { color: '#f8fafc' } }
      }
    }
  });
}

if (calculateBudget) {
  calculateBudget.addEventListener('click', calculateCosts);
}

window.addEventListener('load', calculateCosts);
