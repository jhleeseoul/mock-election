// src/components/TopCharacters.tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { TopCandidate } from '@/hooks/useTopCharacters'

type Props = {
  top3: TopCandidate[]
}

export default function TopCharacters({ top3 }: Props) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
      {top3.map((c, index) => (
        <motion.div
          key={c.id}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:bg-gray-50 border"
        >
          <div className="relative w-[140px] h-[140px] mb-3">
            <Image
              src={c.image}
              alt={c.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <p className="text-lg font-bold">{c.name}</p>
          <p className="text-sm text-gray-600">
            {c.votePercent.toFixed(1)}% / {c.voteCount}표
          </p>
        </motion.div>
      ))}
    </div>
  )
}
