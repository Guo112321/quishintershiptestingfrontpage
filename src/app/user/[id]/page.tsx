'use client'
import { useParams } from 'next/navigation'
import UserProfile from '@/components/user/UserProfile'

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>()
  const uid = Number(id)
  return <UserProfile userId={uid} />
}
