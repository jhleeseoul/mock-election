'use client'

import { useEffect, useState } from 'react'
import { db } from '@/firebase/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(ChartDataLabels)
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const candidates = [
  { id: 'red', name: '빨강이', color: '#E61E2B' },
  { id: 'blue', name: '파랑이', color: '#152484' },
  { id: 'orange', name: '주황이', color: '#FF7210' },
]

type Props = {
  selectedRegion: string | null
}

export default function ResultsPanel({ selectedRegion }: Props) {
  const [allVotes, setAllVotes] = useState<Record<string, any>>({})

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'votes'), (snap) => {
      const data: Record<string, any> = {}
      snap.forEach(doc => {
        data[doc.id] = doc.data()
      })
      setAllVotes(data)
    })

    return () => unsub()
  }, [])

  const aggregateVotes = (regionData: Record<string, any>) => {
    const result: Record<string, number> = { red: 0, blue: 0, orange: 0 }
    for (const [id, info] of Object.entries(regionData)) {
      result[id] += info.total || 0
    }
    return result
  }

  const totalVotes = aggregateVotes(
    Object.values(allVotes).reduce((acc, region) => {
      for (const id in region) {
        acc[id] = acc[id] || { total: 0 }
        acc[id].total += region[id].total || 0
      }
      return acc
    }, {} as Record<string, { total: number }>),
  )

  const selectedVotes = selectedRegion ? allVotes[selectedRegion] || {} : null

  const makeChartData = (data: Record<string, number>) => {
    const total = Object.values(data).reduce((sum, val) => sum + val, 0)
    return {
      labels: candidates.map(c => c.name),
      datasets: [
        {
          label: '득표율',
          data: candidates.map(c => {
            const count = data[c.id] || 0
            return total > 0 ? parseFloat(((count / total) * 100).toFixed(1)) : 0
          }),
          backgroundColor: candidates.map(c => c.color),
        },
      ],
    }
  }



  const options = {
    responsive: true,
    plugins: {
        legend: { display: false },
        datalabels: {
            anchor: 'end' as const,
            align: 'top' as const,
            offset: 5,
            color: '#000',
            font: { weight: 'bold' as const },
            formatter: (value: number) => `${value}`
        }
    },
    layout: {
        padding: {
        top: 30, // ✅ 위쪽 여백 늘리기 (기본은 0)
        },
    },
    scales: {
      y: {
        display: false, // ✅ y축 숨김
        grid: { display: false } // ✅ 격자선 제거
      },
      x: {
        grid: { display: false }, // ✅ x축 격자도 제거 (선택)
        ticks: {
            color: '#000', // ✅ x축 글자 색상
            font: { weight: 'bold' as const }, // ✅ x축 글자 두껍게
        },
      },
    },
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">전체 백분위</h2>
        <Bar data={makeChartData(totalVotes)} options={options} />
      </div>

      {selectedRegion && selectedVotes && (
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mt-6 mb-2 text-gray-800">{selectedRegion} 지역 백분위</h2>
          <Bar data={makeChartData(aggregateVotes(selectedVotes))} options={options} />
        </div>
      )}
    </div>
  )
}
