// src/components/ChartPerformance.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartPerformanceProps {
  dailyData: number[];
}

const ChartPerformance: React.FC<ChartPerformanceProps> = ({ dailyData }) => {
  const data = {
    labels: dailyData.map((_, index) => `Entry ${index + 1}`),
    datasets: [
      {
        label: 'Daily Performance',
        data: dailyData,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Performance Over Time',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ChartPerformance;