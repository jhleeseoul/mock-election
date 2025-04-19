'use client'

import { Dialog } from '@headlessui/react'
import Image from 'next/image'

type Candidate = {
  id: string
  name: string
  color: string
  image: string
  description: string
}

type Props = {
  open: boolean
  onClose: () => void
  candidate: Candidate
}

export default function VoteDetailModal({ open, onClose, candidate }: Props) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg text-center">
          <Image
            src={candidate.image}
            alt={candidate.name}
            width={120}
            height={120}
            className="mx-auto mb-4 rounded-full"
          />
          <h2 className="text-2xl font-bold mb-2 text-gray-700">{candidate.name}</h2>
          <p className="text-gray-700">{candidate.description}</p>
          <button
            onClick={onClose}
            className="mt-6 px-4 py-2 rounded bg-gray-300 text-black font-semibold"
          >
            닫기
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
