import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mock Election',
  description: '지역별 캐릭터 인기 투표 서비스',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      {/* Google Fonts 연결 제거 → 전역에서 globals.css의 font-family 사용 */}
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
