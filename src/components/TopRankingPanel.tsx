'use client'

import { useEffect, useState } from 'react'
import { db } from '@/firebase/firebase'
import { onSnapshot, collection } from 'firebase/firestore'
import Image from 'next/image'

const candidates = [
  { id: 'red', name: '빨강이', color: '#ef4444', image: '/red.png' },
  { id: 'blue', name: '파랑이', color: '#3b82f6', image: '/blue.png' },
  { id: 'orange', name: '주황이', color: '#f97316', image: '/orange.png' },
]

export default function TopRankingPanel() {
  const [totalVotes, setTotalVotes] = useState<Record<string, number>>({})

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'votes'), (snap) => {
      const tally: Record<string, number> = { red: 0, blue: 0, orange: 0 }

      snap.forEach(doc => {
        const data = doc.data()
        for (const id in data) {
          tally[id] = (tally[id] || 0) + (data[id].total || 0)
        }
      })

      setTotalVotes(tally)
    })

    return () => unsub()
  }, [])

  const total = Object.values(totalVotes).reduce((a, b) => a + b, 0)

  const ranked = [...candidates]
    .map(c => ({
      ...c,
      votes: totalVotes[c.id] || 0,
      percent: total > 0 ? Math.round((totalVotes[c.id] || 0) / total * 100) : 0
    }))
    .sort((a, b) => b.votes - a.votes)

  return (
    <div className="flex flex-col gap-2 w-full max-w-md px-4 py-4">
      {ranked.slice(0, 3).map((c, i) => (
        <div key={c.id} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow hover:scale-[1.02] transition">
          <div className="text-3xl font-bold w-6">{i + 1}</div>
          <Image src={c.image} alt={c.name} width={60} height={60} className="rounded-full" />
          <div className="flex-1">
            <div className="text-lg font-semibold">{c.name}</div>
            <div className="h-3 bg-gray-200 rounded">
              <div
                className="h-3 rounded"
                style={{ width: `${c.percent}%`, backgroundColor: c.color }}
              />
            </div>
          </div>
          <div className="text-sm text-gray-600 text-right whitespace-nowrap">
            {c.percent}% <span className="text-xs">({c.votes}표)</span>
          </div>
        </div>
      ))}
    </div>
  )
}
