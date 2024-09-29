import React, { useEffect } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

const EfficiencyChart = () => {
  useEffect(() => {
    const ctx = document.getElementById("efficiencyChart").getContext("2d");
    const efficiencyChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "After Test Case 1 Fixed",
          "After Test Case 2 Fixed",
          "After Test Case 3 Fixed",
        ],
        datasets: [
          {
            label: "Efficiency",
            data: [0.63, 0.72, 0.89],
            borderColor: "white",
            borderWidth: 2,
            fill: false,
            pointBackgroundColor: "white",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "white",
            tension: 0.2, // smooth line
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 1,
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Efficiency Improvement Over Test Case Resolutions",
            font: {
              size: 18,
            },
          },
          legend: {
            display: false,
          },
        },
      },
    });

    // Cleanup function to destroy chart instance on unmount
    return () => {
      efficiencyChart.destroy();
    };
  }, []);

  return (
    <div>
      <canvas id="efficiencyChart" width="400" height="200"></canvas>
    </div>
  );
};

export default EfficiencyChart;
