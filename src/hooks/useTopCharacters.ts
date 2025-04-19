// src/hooks/useTopCharacters.ts
import { useEffect, useState } from 'react'
import { db } from '@/firebase/firebase'
import { collection, onSnapshot } from 'firebase/firestore'

export type TopCandidate = {
  id: string
  name: string
  color: string
  image: string
  voteCount: number
  votePercent: number
}

const candidates = [
  { id: 'red', name: '빨강이', color: '#ef4444', image: '/red.png' },
  { id: 'blue', name: '파랑이', color: '#3b82f6', image: '/blue.png' },
  { id: 'orange', name: '주황이', color: '#f97316', image: '/orange.png' },
]

export function useTopCharacters(): TopCandidate[] {
  const [top3, setTop3] = useState<TopCandidate[]>([])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'votes'), (snapshot) => {
      const totals: Record<string, number> = { red: 0, blue: 0, orange: 0 }

      snapshot.forEach(doc => {
        const data = doc.data() as Record<string, { total: number }>
        for (const id in data) {
          totals[id] = (totals[id] || 0) + (data[id].total || 0)
        }
      })

      const sum = Object.values(totals).reduce((a, b) => a + b, 0)

      const ranked = candidates
        .map(c => ({
          ...c,
          voteCount: totals[c.id] || 0,
          votePercent: sum ? (totals[c.id] / sum) * 100 : 0,
        }))
        .sort((a, b) => b.voteCount - a.voteCount)
        .slice(0, 3)

      setTop3(ranked)
    })

    return () => unsub()
  }, [])

  return top3
}
