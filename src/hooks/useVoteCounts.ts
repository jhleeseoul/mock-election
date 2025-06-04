import { useEffect, useState } from 'react'
import { db } from '@/firebase/firebase'
import { collection, onSnapshot, doc } from 'firebase/firestore'

export function useVoteCounts(region?: string): Record<string, number> {
  const [counts, setCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    if (region) {
      const ref = doc(db, 'votes', region)
      const unsub = onSnapshot(ref, (snap) => {
        const data = snap.data() as Record<string, { total: number }> | undefined
        const totals: Record<string, number> = {}

        if (data) {
          for (const [candidate, info] of Object.entries(data)) {
            totals[candidate] = info.total || 0
          }
        }

        setCounts(totals)
      })

      return () => unsub()
    } else {
      const colRef = collection(db, 'votes')
      const unsub = onSnapshot(colRef, (snapshot) => {
        const totals: Record<string, number> = {}

        snapshot.forEach((doc) => {
          const data = doc.data() as Record<string, { total: number }>
          for (const [candidate, info] of Object.entries(data)) {
            totals[candidate] = (totals[candidate] || 0) + (info.total || 0)
          }
        })

        setCounts(totals)
      })

      return () => unsub()
    }
  }, [region])

  return counts
}
