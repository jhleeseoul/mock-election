// src/lib/submitVoteToFirestore.ts
import { db } from '@/firebase/firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'

export async function submitVoteToFirestore(
  region: string,
  candidateId: string,
  ageGroup: string,
) {
  const voteRef = doc(db, 'votes', region)
  const snap = await getDoc(voteRef)

  const prevData = snap.exists() ? snap.data() : {}

  // 초기화
  const updated = { ...prevData }
  if (!updated[candidateId]) {
    updated[candidateId] = { total: 0 }
  }
  if (!updated[candidateId][ageGroup]) {
    updated[candidateId][ageGroup] = 0
  }

  // 값 증가
  updated[candidateId].total += 1
  updated[candidateId][ageGroup] += 1

  await setDoc(voteRef, updated, { merge: true })
}
