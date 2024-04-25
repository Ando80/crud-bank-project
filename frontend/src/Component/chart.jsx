import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const ChartComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await axios.get("http://localhost:8000/api/get");
        const response = user.data;

        // Récupération des statistiques
        const total = response.totalpay || 0;
        const min = response.minpay || 0;
        const max = response.maxpay || 0;

        // Création du graphique
        createChart(total, min, max);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const createChart = (total, min, max) => {
    const ctx = chartRef.current;

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Total", "Min", "Max"],
        datasets: [
          {
            label: "Statistics",
            data: [total, min, max],
            backgroundColor: ["#a4ee7a", "#FFCE56", "#c2aac7"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "Statistiques des montants",
          },
        },
      },
    });
  };

  return <canvas ref={chartRef} width="300" height="300"></canvas>;
};

export default ChartComponent;
