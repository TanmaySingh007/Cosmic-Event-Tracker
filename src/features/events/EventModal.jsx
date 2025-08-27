import React from 'react'
import { Button } from '../../components/ui/button'

const Row = ({ label, value }) => (
  <div className="flex items-start justify-between gap-4 text-sm py-1">
    <div className="text-slate-400 min-w-40">{label}</div>
    <div className="flex-1 text-slate-100 break-words">{value ?? '—'}</div>
  </div>
)

const EventModal = ({ neo, onClose }) => {
  if (!neo) return null
  const approach = neo?.first_approach
  const velocity = approach?.relative_velocity?.kilometers_per_hour
  const missKm = approach?.miss_distance?.kilometers

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="w-full max-w-2xl rounded-xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <h2 className="text-lg font-semibold">{neo?.name}</h2>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
        <div className="p-5 space-y-2">
          <Row label="Potentially hazardous" value={neo?.is_potentially_hazardous_asteroid ? 'Yes' : 'No'} />
          <Row label="Estimated diameter (km)" value={Number.isFinite(neo?.avg_estimated_diameter_km) ? neo.avg_estimated_diameter_km.toFixed(3) : '—'} />
          <Row label="Closest approach" value={neo?.first_approach_datetime} />
          <Row label="Miss distance (km)" value={missKm} />
          <Row label="Velocity (km/h)" value={velocity} />
          {neo?.nasa_jpl_url && (
            <Row label="JPL URL" value={<a className="text-indigo-400 underline" href={neo.nasa_jpl_url} target="_blank" rel="noreferrer">{neo.nasa_jpl_url}</a>} />
          )}
        </div>
      </div>
    </div>
  )
}

export default EventModal


