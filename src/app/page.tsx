'use client'

import { useState } from 'react'
import KoreaMap from '@/components/KoreaMap'
import VoteCard from '@/components/VoteCard'
import ResultsPanel from '@/components/ResultsPanel'
import TopRankingPanel from '@/components/TopRankingPanel'
import ShareButton from '@/components/ShareButton'

const candidates = [
  {
    id: 'red',
    name: '빨강이',
    color: '#E61E2B',
    image: '/red.png',
    description: '열정적이고 에너지 넘치는 캐릭터'
  },
  {
    id: 'blue',
    name: '파랑이',
    color: '#152484',
    image: '/blue.png',
    description: '차분하고 신뢰감 있는 캐릭터'
  },
  {
    id: 'orange',
    name: '주황이',
    color: '#FF7210',
    image: '/orange.png',
    description: '밝고 긍정적인 매력의 캐릭터'
  }
]

export default function HomePage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  return (
    <div className="flex flex-col md:flex-row w-screen min-h-screen font-sans">
      {/* 왼쪽: 지도 */}
      <div className="w-full md:w-[35%] p-4 bg-white flex items-center justify-center">
        <KoreaMap
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        />
      </div>

      {/* 가운데: 캐릭터 카드 */}
      <div className="w-full md:w-[30%] p-6 bg-white flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-bold text-gray-800">캐릭터 투표</h1>
        <ShareButton />
        <div className="flex flex-col gap-4 w-full max-w-sm">
          {candidates.map((c) => (
            <VoteCard key={c.id} candidate={c} />
          ))}
        </div>
      </div>

      {/* 오른쪽: 순위 + 결과 그래프 */}
      <div className="w-full md:w-[35%] p-4 bg-white flex flex-col gap-6 items-center justify-center">
        <TopRankingPanel />
        <ResultsPanel selectedRegion={selectedRegion} />
      </div>

      
    </div>
  )
}
