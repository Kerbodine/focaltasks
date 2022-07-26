import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

export default function PomodoroBar({ labels, data }) {
  const options = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        // enabled: false,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };
  return (
    <Bar
      data={{
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: "#9ca3af",
            hoverBackgroundColor: "#6b7280",
            borderWidth: 0,
            borderRadius: 4,
          },
        ],
      }}
      options={options}
      height={240}
    />
  );
}
