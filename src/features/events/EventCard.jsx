import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card'
import { Checkbox } from '../../components/ui/checkbox'

const HazardBadge = ({ hazardous }) => {
  return (
    <span className={hazardous ? 'text-red-600 font-medium' : 'text-green-600'}>
      {hazardous ? 'Hazardous' : 'Not hazardous'}
    </span>
  )
}

const EventCard = ({ neo, checked, onToggle }) => {
  const name = neo?.name || neo?.designation || 'Unknown'
  const diameter = neo?.avg_estimated_diameter_km
  const approach = neo?.first_approach_datetime || 'N/A'
  const hazardous = !!neo?.is_potentially_hazardous_asteroid
  const neoId = neo?.neo_reference_id

  return (
    <Card className="card-hover bg-card/60 backdrop-blur border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription className="mt-1">
              <HazardBadge hazardous={hazardous} />
            </CardDescription>
          </div>
          <Checkbox
            aria-label="Select NEO"
            checked={checked}
            onChange={(e) => onToggle(neoId, e.target.checked)}
          />
        </div>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground space-y-1">
        <div>
          <span className="font-medium text-foreground">Estimated diameter (km):</span>{' '}
          {Number.isFinite(diameter) ? diameter.toFixed(3) : 'N/A'}
        </div>
        <div>
          <span className="font-medium text-foreground">Closest approach:</span>{' '}
          {approach}
        </div>
      </CardContent>
    </Card>
  )
}

export default EventCard


