import { useEffect, useState } from 'react'
import { db } from '@/firebase/firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

export function useVoteCounts(region?: string): Record<string, number> {
  const [counts, setCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    const base = collection(db, 'votes')
    const q = region ? query(base, where('region', '==', region)) : base

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newCounts: Record<string, number> = {}

      snapshot.forEach((doc) => {
        const name = doc.data().candidate
        newCounts[name] = (newCounts[name] || 0) + 1
      })

      setCounts(newCounts)
    })

    return () => unsubscribe()
  }, [region])

  return counts
}
