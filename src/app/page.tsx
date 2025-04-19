'use client'

import { useState } from 'react'
import KoreaMap from '@/components/KoreaMap'
import VoteCard from '@/components/VoteCard'
import ResultsPanel from '@/components/ResultsPanel'

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
    <div className="flex flex-col md:flex-row w-screen h-screen overflow-hidden font-sans">
      {/* 왼쪽: 지도 */}
      <div className="w-full md:w-[35%] bg-white flex items-center justify-center">
        <KoreaMap
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        />
      </div>

      {/* 가운데: 결과 시각화 */}
      <div className="w-full md:w-[30%] bg-white flex items-center justify-center p-4 overflow-y-auto">
        <ResultsPanel selectedRegion={selectedRegion} />
      </div>

      {/* 오른쪽: 캐릭터 카드 */}
      <div className="w-full md:w-[35%] bg-white flex flex-col items-center justify-center gap-6 p-6">
        <h1 className="text-2xl font-bold text-gray-800">캐릭터 투표</h1>
        <div className="flex flex-col gap-4 w-full max-w-sm">
          {candidates.map((c) => (
            <VoteCard key={c.id} candidate={c} />
          ))}
        </div>
      </div>
    </div>
  )
}
