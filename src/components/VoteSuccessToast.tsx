'use client'

import { useEffect } from 'react'

type Props = {
  visible: boolean
  onClose: () => void
}

export default function VoteSuccessToast({ visible, onClose }: Props) {
  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(onClose, 2500)
    return () => clearTimeout(timer)
  }, [visible])

  if (!visible) return null

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
      🎉 투표가 완료되었습니다!
    </div>
  )
}
