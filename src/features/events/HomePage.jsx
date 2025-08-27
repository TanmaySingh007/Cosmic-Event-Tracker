import React, { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Button } from '../../components/ui/button'
import { useNeoData } from './NeoContext'
import EventsList from './EventsList'
import EventModal from './EventModal'
import HeroAPOD from './HeroAPOD'
import { useNavigate } from 'react-router-dom'

const NEO_FEED_URL = 'https://api.nasa.gov/neo/rest/v1/feed'

const formatDate = (date) => date.toISOString().slice(0, 10)

const averageKilometerDiameter = (neo) => {
  const km = neo?.estimated_diameter?.kilometers
  if (!km) return null
  const min = Number(km.estimated_diameter_min)
  const max = Number(km.estimated_diameter_max)
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null
  return (min + max) / 2
}

const flattenNeoResponse = (nearEarthObjectsByDate) => {
  const all = []
  Object.keys(nearEarthObjectsByDate || {}).forEach((dateKey) => {
    const list = nearEarthObjectsByDate[dateKey] || []
    list.forEach((neo) => {
      const avgDiameterKm = averageKilometerDiameter(neo)
      const firstApproach = neo?.close_approach_data?.[0]
      all.push({
        ...neo,
        avg_estimated_diameter_km: avgDiameterKm,
        first_approach: firstApproach,
        first_approach_datetime: firstApproach?.close_approach_date_full || firstApproach?.close_approach_date || null,
        first_miss_distance_km: firstApproach ? Number(firstApproach?.miss_distance?.kilometers) : null,
      })
    })
  })
  return all
}

const addDays = (date, days) => {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

const HomePage = () => {
  const { neos, setNeos } = useNeoData()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedNEOs, setSelectedNEOs] = useState([])
  const [showHazardousOnly, setShowHazardousOnly] = useState(false)
  const [sortAsc, setSortAsc] = useState(true)
  const [startDate, setStartDate] = useState(() => {
    const d = new Date()
    return formatDate(d)
  })
  const [endDate, setEndDate] = useState(() => {
    const d = addDays(new Date(), 2)
    return formatDate(d)
  })
  const navigate = useNavigate()
  const [activeNeo, setActiveNeo] = useState(null)

  const handleSelect = useCallback((neoReferenceId, checked) => {
    setSelectedNEOs((prev) => {
      if (checked) {
        if (prev.includes(neoReferenceId)) return prev
        return [...prev, neoReferenceId]
      }
      return prev.filter((id) => id !== neoReferenceId)
    })
  }, [])

  const fetchFeed = useCallback(async (rangeStart, rangeEnd, append = false) => {
    setLoading(true)
    setError('')
    try {
      const apiKey = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY'
      const { data } = await axios.get(NEO_FEED_URL, {
        params: { start_date: rangeStart, end_date: rangeEnd, api_key: apiKey },
      })
      const flattened = flattenNeoResponse(data?.near_earth_objects)
      setNeos((prev) => (append ? [...prev, ...flattened] : flattened))
    } catch (e) {
      setError('Failed to load NEO data')
    } finally {
      setLoading(false)
    }
  }, [setNeos])

  useEffect(() => {
    fetchFeed(startDate, endDate, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onLoadMore = async () => {
    const currentEnd = new Date(endDate)
    const newEnd = addDays(currentEnd, 3)
    const newEndStr = formatDate(newEnd)
    await fetchFeed(formatDate(addDays(currentEnd, 1)), newEndStr, true)
    setEndDate(newEndStr)
  }

  const processedNeos = useMemo(() => {
    let arr = [...neos]
    if (showHazardousOnly) {
      arr = arr.filter(n => n.is_potentially_hazardous_asteroid)
    }
    arr.sort((a, b) => {
      const ad = a.first_approach_datetime || ''
      const bd = b.first_approach_datetime || ''
      return sortAsc ? ad.localeCompare(bd) : bd.localeCompare(ad)
    })
    return arr
  }, [neos, showHazardousOnly, sortAsc])

  return (
    <div className="relative">
      <div className="stars"></div>
      <div className="planet"></div>
      <div className="planet2"></div>
      <div className="container mx-auto px-4 py-10 relative z-10 space-y-6">
        <HeroAPOD />
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Near Earth Objects</h1>
            <p className="text-muted-foreground mt-2">Live feed from NASA NeoWs. Select objects to compare.</p>
          </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input type="checkbox" checked={showHazardousOnly} onChange={(e)=>setShowHazardousOnly(e.target.checked)} /> Hazardous only
          </label>
          <Button variant="outline" onClick={()=>setSortAsc(s=>!s)}>{sortAsc ? 'Sort ↓' : 'Sort ↑'}</Button>
          <Button variant="outline" disabled={selectedNEOs.length === 0} onClick={() => {
            const ids = selectedNEOs.join(',')
            navigate(`/compare?ids=${ids}`)
          }}>Compare</Button>
          <Button onClick={onLoadMore} disabled={loading}>Load More</Button>
        </div>
        </div>
      </div>

      {loading && (
        <div className="py-16 flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        </div>
      )}
      {!!error && (
        <div className="py-4 text-destructive">{error}</div>
      )}

      {!loading && !error && (
        <EventsList
          neos={processedNeos}
          selectedNEOs={selectedNEOs}
          onSelect={handleSelect}
          onOpen={setActiveNeo}
        />
      )}
      {activeNeo && <EventModal neo={activeNeo} onClose={()=>setActiveNeo(null)} />}
    </div>
  )
}

export default HomePage


