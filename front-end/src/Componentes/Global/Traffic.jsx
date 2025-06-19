import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { format, subDays } from 'date-fns'
import axios from 'axios'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Registra los componentes de ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export const SiteTraffic = ({ apiEndpoint }) => {
  const [timeRange, setTimeRange] = useState('7days')
  const [trafficData, setTrafficData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTrafficData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${apiEndpoint}?range=${timeRange}`)
        setTrafficData(response.data)
        setError(null)
      } catch (err) {
        setError('Error al cargar los datos de tráfico')
        console.error('Error fetching traffic data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTrafficData()
  }, [timeRange, apiEndpoint])

  // Generar datos de ejemplo si no hay API (para desarrollo)
  const generateMockData = () => {
    const days = timeRange === '7days' ? 7 : timeRange === '30days' ? 30 : 7
    const labels = []
    const visits = []
    const uniqueUsers = []
    
    for (let i = days; i >= 0; i--) {
      const date = subDays(new Date(), i)
      labels.push(format(date, 'MMM dd'))
      visits.push(Math.floor(Math.random() * 1000) + 500)
      uniqueUsers.push(Math.floor(Math.random() * 800) + 300)
    }
    
    return { labels, visits, uniqueUsers }
  }

  const dataToUse = trafficData || generateMockData()

  const chartData = {
    labels: dataToUse.labels,
    datasets: [
      {
        label: 'Visitas',
        data: dataToUse.visits,
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.3,
        fill: true,
        yAxisID: 'y',
      },
      {
        label: 'Usuarios Únicos',
        data: dataToUse.uniqueUsers,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3,
        fill: true,
        yAxisID: 'y',
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        min: 0,
        grid: {
          drawOnChartArea: true,
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Tráfico del Sitio</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange('7days')}
            className={`px-3 py-1 rounded-md text-sm ${timeRange === '7days' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            7 días
          </button>
          <button
            onClick={() => setTimeRange('30days')}
            className={`px-3 py-1 rounded-md text-sm ${timeRange === '30days' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            30 días
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 text-center">{error}</div>
      ) : (
        <>
          <div className="h-80">
            <Line data={chartData} options={options} />
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Visitas Totales</h3>
              <p className="text-2xl font-semibold text-gray-900">
                {dataToUse.visits.reduce((a, b) => a + b, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Usuarios Únicos</h3>
              <p className="text-2xl font-semibold text-gray-900">
                {dataToUse.uniqueUsers.reduce((a, b) => a + b, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Ratio Visitas/Usuarios</h3>
              <p className="text-2xl font-semibold text-gray-900">
                {(
                  dataToUse.visits.reduce((a, b) => a + b, 0) / 
                  dataToUse.uniqueUsers.reduce((a, b) => a + b, 0) || 0
                ).toFixed(2)}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}