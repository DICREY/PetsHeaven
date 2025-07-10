import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

import { GetData } from '../Varios/Requests'
const RazasFrecuentesChart = ({ URL = '' }) => {
  const [datosRazas, setDatosRazas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getPetStats = async () => {
      try {
        const data = await GetData(`${URL}/global/frequent-pets`)
        setLoading(null)
        if (data) setDatosRazas(data)
      } catch (err) {
        const message = errorStatusHandler(err)
        setError(message)
      }
    }

    getPetStats()
  }, [])

  if (loading) return <div>Cargando datos...</div>
  if (error) return <div>Error: {error}</div>
  if (!datosRazas.length) return <div>No hay datos disponibles</div>

  // Preparar datos para el gráfico
  const data = {
    labels: datosRazas.map(raza => raza.Raza),
    datasets: [
      {
        label: 'Cantidad de Mascotas',
        data: datosRazas.map(raza => raza.Cantidad_Mascotas),
        backgroundColor: 'rgba(64, 224, 208, 0.7)',
        borderColor: 'rgba(64, 224, 208, 1)',
        borderWidth: 1,
        yAxisID: 'y'
      },
      {
        label: 'Edad Promedio (años)',
        data: datosRazas.map(raza => raza.Edad_Promedio_Años),
        backgroundColor: '#0097a7',
        borderColor: '#0097a7',
        borderWidth: 1,
        type: 'line',
        yAxisID: 'y1'
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Razas más frecuentes y sus edades',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          afterBody: function(context) {
            const raza = datosRazas[context[0].dataIndex]
            return [
              `Especie: ${raza.Especie}`,
              `Edad mínima: ${raza.Edad_Minima} años`,
              `Edad máxima: ${raza.Edad_Maxima} años`,
              `Género más común: ${raza.Genero_Mas_Comun === 'F' ? 'Hembra' : 'Macho'}`,
              `Estado reproductivo: ${raza.Estado_Reproductivo_Mas_Comun}`
            ]
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Raza'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Cantidad de Mascotas'
        },
        beginAtZero: true,
        position: 'left'
      },
      y1: {
        title: {
          display: true,
          text: 'Edad (años)'
        },
        beginAtZero: true,
        position: 'right',
        grid: {
          drawOnChartArea: false
        }
      }
    },
    maintainAspectRatio: false
  }

  return (
    <div style={{ 
      width: '100%', 
      height: '500px', 
      margin: '20px 0',
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <Bar data={data} options={options} />
    </div>
  )
}

export default RazasFrecuentesChart