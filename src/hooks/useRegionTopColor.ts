import { useEffect, useState } from 'react'
import { db } from '@/firebase/firebase'
import { onSnapshot, collection } from 'firebase/firestore'

export function useRegionTopColor(): Record<string, string> {
  const [regionColors, setRegionColors] = useState<Record<string, string>>({})

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'votes'), (snap) => {
      const result: Record<string, string> = {}

      snap.forEach(doc => {
        const region = doc.id
        const data = doc.data() as Record<string, { total: number }>
        let top = ''
        let max = -1

        for (const candidateId in data) {
          const entry = data[candidateId]
          if (entry.total > max) {
            top = candidateId
            max = entry.total
          }
        }

        result[region] = top
      })

      setRegionColors(result)
      console.log('regionColors:', result)
    })

    return () => unsub()
  }, [])

  return regionColors
}
