'use client'

import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { Tooltip } from 'react-tooltip'
import { useRegionTopColor } from '@/hooks/useRegionTopColor'
import { useRegionVoteRates } from '@/hooks/useRegionVoteRates'

const geoUrl = '/geo/korea-provinces.json'

const candidateColors: Record<string, string> = {
  red: '#E61E2B',
  blue: '#152484',
  orange: '#FF7210',
}

type KoreaMapProps = {
  selectedRegion: string | null
  setSelectedRegion: (region: string) => void
}

export default function KoreaMap({ selectedRegion, setSelectedRegion }: KoreaMapProps) {
  const regionColors = useRegionTopColor() // ✅ 가져오기
  const voteRates = useRegionVoteRates()
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-[100%] h-auto px-4">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 6500,
            center: [127.7669, 35.9078],
          }}
          width={800}
          height={1000}
        >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name = geo.properties.CTP_KOR_NM // ✅ 여기 고쳤지
              const topId = regionColors[name] // ✅ 득표 1위 후보 ID
              const fillColor =
                candidateColors[topId] || '#DDD' // ✅ 색상 결정
                  console.log('name:', name, 'topId:', topId, 'fillColor:', fillColor)
              const rates = voteRates[name] || {} // ✅ 지역별 투표 비율
              const tooltipContent = rates
                ? `${name}\n${Object.entries(rates)
                    .map(([id, pct]) => `${id}: ${pct}%`)
                    .join('\n')}`
                : name

                  return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fillColor}
                  stroke="#FFF"
                  data-tooltip-id="map-tooltip"
                  data-tooltip-content={tooltipContent}
                  onClick={() => setSelectedRegion(name)}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#999', outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              )
            })
          }
        </Geographies>
        </ComposableMap>
        <Tooltip id="map-tooltip" />
        
      </div>
    </div>
  )
}
