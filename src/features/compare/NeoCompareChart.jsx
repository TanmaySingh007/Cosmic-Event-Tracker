import React, { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const NeoCompareChart = ({ neos }) => {
  const chartData = useMemo(() => {
    const labels = neos.map((n) => n.name || n.designation || n.neo_reference_id)
    const diameters = neos.map((n) => Number.isFinite(n.avg_estimated_diameter_km) ? n.avg_estimated_diameter_km : null)
    const missDistances = neos.map((n) => Number.isFinite(n.first_miss_distance_km) ? n.first_miss_distance_km : null)

    return {
      labels,
      datasets: [
        {
          label: 'Estimated Diameter (km)',
          data: diameters,
          backgroundColor: 'rgba(99, 102, 241, 0.6)',
        },
        {
          label: 'Miss Distance (km)',
          data: missDistances,
          backgroundColor: 'rgba(16, 185, 129, 0.6)',
        },
      ],
    }
  }, [neos])

  const options = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'NEO Diameter vs Miss Distance' },
      tooltip: { mode: 'index', intersect: false },
    },
    interaction: { mode: 'nearest', intersect: false },
    scales: {
      y: { beginAtZero: true },
    },
  }), [])

  return (
    <div className="bg-slate-900 text-slate-100 rounded-lg border border-slate-800 p-4 shadow-xl">
      <Bar data={chartData} options={options} />
    </div>
  )
}

export default NeoCompareChart


