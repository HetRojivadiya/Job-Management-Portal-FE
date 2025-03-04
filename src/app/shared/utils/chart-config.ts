import { ChartConfiguration } from 'chart.js';

export function getJobApplicationChartConfig(
  jobCounts: number[], 
  applicationCounts: number[]
): ChartConfiguration {
  return {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Jobs Per Month',
          data: jobCounts,
          backgroundColor: 'rgba(41, 128, 185, 0.8)',
          borderColor: 'rgba(41, 128, 185, 1)',
          borderWidth: 2,
          borderRadius: 10,
          barPercentage: 0.7,
          categoryPercentage: 0.9,
          yAxisID: 'y',
          order: 2
        },
        {
          label: 'Applications Per Month',
          data: applicationCounts,
          type: 'line',
          borderColor: 'rgba(231, 76, 60, 0.8)',
          borderWidth: 4,
          pointRadius: 6,
          pointBorderWidth: 3,
          pointBorderColor: 'rgba(192, 57, 43, 0.5)',
          pointBackgroundColor: 'rgba(231, 76, 60, 1)',
          pointHoverRadius: 8,
          fill: false,
          yAxisID: 'y1',
          order: 1
        }
      ]
    },
    options: {
      responsive: true,
      layout: { padding: 20 },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Number of Jobs', font: { size: 16, weight: 'bold' } },
          ticks: { stepSize: 1 }
        },
        y1: {
          beginAtZero: true,
          position: 'right',
          title: { display: true, text: 'Number of Applications', font: { size: 16, weight: 'bold' } },
          grid: { drawOnChartArea: false },
          ticks: { stepSize: 1 }
        }
      },
      plugins: {
        legend: { position: 'top' },
        tooltip: { backgroundColor: '#2c3e50', bodyColor: '#ffffff' }
      }
    }
  };
}


export function getApplicationStatusChartConfig(data: { pending: number; approved: number; rejected: number }): ChartConfiguration {
  return {
    type: 'doughnut',
    data: {
      labels: ['Pending', 'Approved', 'Rejected'],
      datasets: [
        {
          data: [data.pending, data.approved, data.rejected],
          backgroundColor: [
            'rgba(243, 156, 18, 0.7)',  
            'rgba(46, 204, 113, 0.7)', 
            'rgba(231, 76, 60, 0.7)'   
          ],
          hoverBackgroundColor: [
            'rgba(243, 156, 18, 1)',
            'rgba(46, 204, 113, 1)',
            'rgba(231, 76, 60, 1)'
          ],
          borderWidth: 3,
          borderColor: '#ffffff',
          hoverOffset: 12
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              size: 14,
              weight: 'bold'
            },
            color: '#2c3e50'
          }
        },
        tooltip: {
          backgroundColor: '#2c3e50',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          borderWidth: 1,
          borderColor: '#ffffff'
        }
      },
    }
  };
}
