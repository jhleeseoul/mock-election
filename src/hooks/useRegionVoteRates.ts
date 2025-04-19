// src/hooks/useRegionVoteRates.ts
import { useEffect, useState } from 'react'
import { db } from '@/firebase/firebase'
import { collection, onSnapshot } from 'firebase/firestore'

type VoteRates = Record<string, Record<string, number>> // ex: { 서울특별시: { red: 45, blue: 30, orange: 25 } }

export function useRegionVoteRates(): VoteRates {
  const [rates, setRates] = useState<VoteRates>({})

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'votes'), (snapshot) => {
      const result: VoteRates = {}

      snapshot.forEach((doc) => {
        const region = doc.id
        const data = doc.data() as Record<string, { total: number }>

        let sum = 0
        const regionCounts: Record<string, number> = {}

        for (const candidate in data) {
          const total = data[candidate]?.total || 0
          regionCounts[candidate] = total
          sum += total
        }

        const regionRates: Record<string, number> = {}
        for (const candidate in regionCounts) {
          const percent = sum > 0 ? Math.round((regionCounts[candidate] / sum) * 100) : 0
          regionRates[candidate] = percent
        }

        result[region] = regionRates
      })

      setRates(result)
    })

    return () => unsub()
  }, [])

  return rates
}
