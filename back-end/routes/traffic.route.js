// Librarys
const express = require('express')

// Vars 
const router = express.Router()

const Analytics = require('../models/Analytics')

// Routes 
router.get('/', async (req, res) => {
  try {
    const { range = '7days' } = req.query
    const days = range === '30days' ? 30 : 7
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(endDate.getDate() - days)

    // Agregación para obtener datos por día
    const trafficData = await Analytics.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          visits: { $sum: "$visits" },
          uniqueUsers: { $addToSet: "$userId" }
        }
      },
      {
        $project: {
          date: "$_id",
          visits: 1,
          uniqueUsers: { $size: "$uniqueUsers" },
          _id: 0
        }
      },
      { $sort: { date: 1 } }
    ])

    // Formatear respuesta
    const labels = trafficData.map(item => {
      const date = new Date(item.date)
      return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })
    })
    const visits = trafficData.map(item => item.visits)
    const uniqueUsers = trafficData.map(item => item.uniqueUsers)

    res.json({ labels, visits, uniqueUsers })
  } catch (error) {
    console.error('Error fetching traffic data:', error)
    res.status(500).json({ error: 'Error al obtener datos de tráfico' })
  }
})

module.exports = router