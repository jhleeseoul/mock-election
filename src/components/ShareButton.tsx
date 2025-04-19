'use client'
import { useState } from 'react'

export default function ShareButton() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="text-sm text-blue-600 underline hover:text-blue-800 transition"
    >
      {copied ? '복사됨!' : '🔗 공유하기'}
    </button>
  )
}
