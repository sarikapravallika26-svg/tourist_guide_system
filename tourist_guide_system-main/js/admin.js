const userGrowthChart = document.getElementById('userGrowthChart');
const destinationChart = document.getElementById('destinationChart');

function renderAdminCharts() {
  if (userGrowthChart) {
    new Chart(userGrowthChart, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'New Users',
          data: [450, 520, 640, 780, 940, 1120],
          borderColor: 'rgba(37, 99, 235, 0.92)',
          backgroundColor: 'rgba(37, 99, 235, 0.18)',
          fill: true,
          tension: 0.35,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  if (destinationChart) {
    new Chart(destinationChart, {
      type: 'bar',
      data: {
        labels: ['Beach', 'Mountain', 'Historical', 'Wildlife', 'Adventure'],
        datasets: [{
          label: 'Popularity',
          data: [88, 76, 64, 55, 72],
          backgroundColor: ['#2563EB', '#06B6D4', '#F59E0B', '#10B981', '#6366F1']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
}

window.addEventListener('load', renderAdminCharts);
