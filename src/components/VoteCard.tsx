'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import VoteModal from './VoteModal'
import VoteDetailModal from './VoteDetailModal'
import VoteSuccessToast from './VoteSuccessToast'

type Candidate = {
  id: string
  name: string
  color: string
  image: string
  description: string
}

type VoteCardProps = {
  candidate: Candidate
}

export default function VoteCard({ candidate }: VoteCardProps) {
  const [open, setOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)

  return (
    <>
      <motion.div
        className="flex items-center gap-4 w-full h-[140px] px-4 py-3 bg-white rounded-xl shadow hover:shadow-lg transition-all"
        whileHover={{ scale: 1.02 }}
      >
        <Image
          src={candidate.image}
          alt={candidate.name}
          width={100}
          height={100}
          className="w-[100px] h-[100px] rounded-full object-cover"
        />
        <div className="flex-1 flex flex-col justify-between h-full py-1">
          <h2 className="text-lg font-bold text-gray-800">{candidate.name}</h2>
          <p className="text-sm text-gray-600 truncate">{candidate.description}</p>
          <div className="flex gap-2 mt-auto">
            <button
              className="px-3 py-1 text-sm text-white rounded"
              style={{ backgroundColor: candidate.color }}
              onClick={() => setOpen(true)}
            >
              투표하기
            </button>
            <button
              className="px-3 py-1 text-sm border border-blue-400 text-blue-600 rounded hover:bg-blue-50"
              onClick={() => setDetailOpen(true)}
            >
              상세 보기
            </button>
          </div>
        </div>
      </motion.div>

      <VoteModal
        open={open}
        onClose={() => setOpen(false)}
        candidate={candidate}
        onVoteSuccess={() => {
          setOpen(false)
          setShowToast(true)
        }}
      />

      <VoteDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        candidate={candidate}
      />

      <VoteSuccessToast visible={showToast} onClose={() => setShowToast(false)} />
    </>
  )
}
