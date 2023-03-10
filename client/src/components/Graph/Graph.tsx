import React from 'react';
import { Line } from 'react-chartjs-2';

const BarChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December' ],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [65, 59, 80, 81, 56, 55, 40,50,78,18,45,23],
        fill: false,
        borderColor: 'rgb(156,204,101)',
        tension: 0.1
      }
    ]
  };
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  return (
    <div>
        
        <Line data={data} options={options} />
    </div>
  );
};

export default BarChart;
