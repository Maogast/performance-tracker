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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define the PerformanceEntry interface
interface PerformanceEntry {
  value: number;
  timestamp: any; // Firestore Timestamp or number
  note?: string;
  category?: string;
}

// Define the ChartPerformanceProps interface
interface ChartPerformanceProps {
  dailyData: PerformanceEntry[]; // Accept an array of PerformanceEntry objects
}

const ChartPerformance: React.FC<ChartPerformanceProps> = ({ dailyData }) => {
  // Extract values and timestamps for the chart
  const data = {
    labels: dailyData.map((entry) => {
      // Convert Firestore Timestamp or UNIX timestamp to a valid Date
      const date =
        entry.timestamp.toDate?.() || new Date(entry.timestamp); // Handle both Firestore Timestamp and UNIX timestamp
      return date.toLocaleDateString(); // Format the date for the X-axis
    }),
    datasets: [
      {
        label: 'Performance Values',
        data: dailyData.map((entry) => entry.value), // Y-axis values
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            return `Value: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Performance Value',
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ChartPerformance;