'use client'

import { useVoteCounts } from '@/hooks/useVoteCounts'
import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const REGIONS = ['전체', '서울', '부산', '대구', '광주', '대전', '경기', '강원', '제주']

export default function ResultsPage() {
  const [region, setRegion] = useState('전체')
  const results = useVoteCounts(region === '전체' ? undefined : region)

  const labels = Object.keys(results)
  const data = {
    labels,
    datasets: [
      {
        label: '득표 수',
        data: Object.values(results),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        {region === '전체' ? '전체 결과' : `${region} 지역 결과`}
      </h1>

      <select value={region} onChange={(e) => setRegion(e.target.value)}>
        {REGIONS.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>

      {labels.length === 0 ? (
        <p>결과 없음</p>
      ) : (
        <Bar
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
            },
          }}
        />
      )}
    </div>
  )
}
