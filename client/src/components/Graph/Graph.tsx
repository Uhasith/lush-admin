import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { dashboardApi } from 'src/apis/dasboard.api';

const BarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    const result = await dashboardApi();
    setChartData(result?.data);
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
      <Line data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
