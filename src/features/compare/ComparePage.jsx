import React, { useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useNeoData } from '../events/NeoContext'
import { Button } from '../../components/ui/button'
import NeoCompareChart from './NeoCompareChart'

const ComparePage = () => {
  const [params] = useSearchParams()
  const { neos } = useNeoData()

  const selectedIds = useMemo(() => {
    const raw = params.get('ids') || ''
    return raw.split(',').map((s) => s.trim()).filter(Boolean)
  }, [params])

  const selectedNeos = useMemo(() => {
    if (!Array.isArray(neos) || neos.length === 0) return []
    const idSet = new Set(selectedIds)
    return neos.filter((n) => idSet.has(n.neo_reference_id))
  }, [neos, selectedIds])

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Compare NEOs</h1>
        <Button asChild variant="outline">
          <Link to="/">Back</Link>
        </Button>
      </div>

      {selectedNeos.length === 0 ? (
        <div className="text-muted-foreground">No NEOs selected. Return and select some to compare.</div>
      ) : (
        <NeoCompareChart neos={selectedNeos} />
      )}
    </div>
  )
}

export default ComparePage


