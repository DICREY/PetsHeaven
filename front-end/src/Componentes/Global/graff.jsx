import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Registrar componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RazasPorAnioChart = ({ datosMascotas }) => {
  // Procesar datos para el gráfico
  const procesarDatos = (mascotas) => {
    // Agrupar por año de nacimiento y luego por raza
    const datosAgrupados = mascotas.reduce((acc, mascota) => {
      const año = new Date(mascota.fec_nac_mas).getFullYear();
      if (!acc[año]) {
        acc[año] = {};
      }
      acc[año][mascota.raz_mas] = (acc[año][mascota.raz_mas] || 0) + 1;
      return acc;
    }, {});

    // Obtener años únicos ordenados
    const años = Object.keys(datosAgrupados).sort();

    // Obtener todas las razas únicas
    const todasRazas = [...new Set(
      mascotas.map(mascota => mascota.raz_mas)
    )];

    // Preparar datasets para Chart.js
    const datasets = todasRazas.map((raza, index) => ({
      label: raza,
      data: años.map(año => datosAgrupados[año][raza] || 0),
      backgroundColor: index % 2 === 0 
        ? 'rgba(128, 128, 128, 0.7)' // Gris principal
        : 'rgba(64, 224, 208, 0.7)', // Verde aguamarina secundario
      borderColor: index % 2 === 0 
        ? 'rgba(128, 128, 128, 1)' 
        : 'rgba(64, 224, 208, 1)',
      borderWidth: 1
    }));

    return {
      labels: años,
      datasets: datasets
    };
  };

  const data = datosMascotas && procesarDatos(datosMascotas);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribución de Razas por Año de Nacimiento',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw} mascotas`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Año de Nacimiento'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Cantidad de Mascotas'
        },
        beginAtZero: true
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div style={{ width: '100%', height: '500px', margin: '20px 0' }}>
        {datosMascotas && (
            <Bar data={data} options={options} />
        )}
    </div>
  );
};

export default RazasPorAnioChart;