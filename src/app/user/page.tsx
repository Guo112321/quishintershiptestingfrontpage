'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUsers } from '@/lib/users'

export default function UserIndexPage() {
  const router = useRouter()
  const { members } = useUsers()
  const [isDesktop, setIsDesktop] = useState(false)

  // 仅在客户端判断屏宽：≥768 认为桌面端
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => setIsDesktop(mq.matches)
    onChange()
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  // 桌面端自动跳到第一个成员；移动端停留在 /user 展示列表（Sidebar 由 layout 提供）
  useEffect(() => {
    if (!isDesktop) return
    if (members.length > 0) {
      router.replace(`/user/${members[0].id}`)
    }
  }, [isDesktop, members, router])

  // 右侧主区域给个轻量占位（移动端基本看不到右侧；桌面端会很快被 replace）
  return (
    <div className="p-6 text-sm text-gray-500">
      请选择左侧成员查看资料
    </div>
  )
}
