import React, { useMemo } from 'react'
import EventCard from './EventCard'

const formatDate = (dateStr) => {
  if (!dateStr) return 'Unknown Date'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const EventsList = ({ neos, selectedNEOs, onSelect, onOpen }) => {
  const groupedNeos = useMemo(() => {
    const groups = {}
    neos.forEach(neo => {
      const dateKey = neo.first_approach_datetime?.split('T')[0] || 'unknown'
      if (!groups[dateKey]) groups[dateKey] = []
      groups[dateKey].push(neo)
    })
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))
  }, [neos])

  return (
    <div className="space-y-8">
      {groupedNeos.map(([dateKey, neosForDate]) => (
        <div key={dateKey}>
          <h3 className="text-lg font-semibold text-slate-300 mb-4 border-b border-slate-800 pb-2">
            {formatDate(dateKey)}
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {neosForDate.map((neo) => (
              <div key={neo.id || neo.neo_reference_id} onClick={()=>onOpen && onOpen(neo)} className="cursor-pointer">
                <EventCard
                  neo={neo}
                  checked={selectedNEOs.includes(neo.neo_reference_id)}
                  onToggle={onSelect}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default EventsList


