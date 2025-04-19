// src/components/VoteModal.tsx
'use client'

import { Dialog } from '@headlessui/react'
import { useState, Fragment } from 'react'
import { submitVoteToFirestore } from '@/lib/submitVoteToFirestore'
import { on } from 'events'

type Candidate = {
  id: string
  name: string
  color: string
  image: string
  description: string
}

type VoteModalProps = {
  open: boolean
  onClose: () => void
  candidate: Candidate
  onVoteSuccess?: () => void
}

export default function VoteModal({ open, onClose, candidate, onVoteSuccess }: VoteModalProps) {
  const [age, setAge] = useState('10대')
  const [gender, setGender] = useState('여성')
  const [region, setRegion] = useState('서울특별시')

  const handleSubmit = async () => {
    await submitVoteToFirestore(region, candidate.id, age)
    onVoteSuccess?.()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} as="div" className="relative z-50">
      {/* 오버레이 */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* 모달 창 */}
      <div className="fixed inset-0 flex items-center justify-center p-4 ">
        <Dialog.Panel className="bg-white rounded-lg shadow p-6 w-[90%] max-w-md">
          <h2 className="text-lg font-bold mb-4 text-gray-600">{candidate.name}에게 투표하기</h2>

          {/* 성별 */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-600">성별</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full border rounded px-2 py-1 text-gray-600">
              <option>여성</option>
              <option>남성</option>
              <option>기타</option>
            </select>
          </div>

          {/* 연령 */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-600">연령대</label>
            <select value={age} onChange={(e) => setAge(e.target.value)} className="w-full border rounded px-2 py-1 text-gray-600">
              <option>10대</option>
              <option>20대</option>
              <option>30대</option>
              <option>40대</option>
              <option>50대 이상</option>
            </select>
          </div>

          {/* 지역 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">지역</label>
            <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full border rounded px-2 py-1 text-gray-600">
              <option>서울특별시</option>
              <option>부산광역시</option>
              <option>대구광역시</option>
              <option>광주광역시</option>
              <option>대전광역시</option>
              <option>인천광역시</option>
              <option>경기도</option>
              <option>강원도</option>
              <option>제주특별자치도</option>
              <option>충청북도</option>
              <option>충청남도</option>
              <option>전라북도</option>
              <option>전라남도</option>
              <option>경상북도</option>
              <option>경상남도</option>
              <option>울산광역시</option>
              <option>세종특별자치시</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300 text-black">취소</button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded text-white"
              style={{ backgroundColor: candidate.color }}
            >
              제출
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
