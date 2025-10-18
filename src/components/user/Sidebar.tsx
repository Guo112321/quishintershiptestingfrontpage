'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import UserIcon from './Usericon'
import { useUsers } from '@/lib/users'

export default function Sidebar() {
  const pathname = usePathname()
  const { members } = useUsers()

  return (
    <aside className="w-64 shrink-0 border-r h-[100dvh] overflow-y-auto p-3">
      <div className="mb-3 text-xs text-gray-500">空间成员（{members.length}）</div>

      <div className="flex flex-col gap-2">
        {members.map((u) => {
          const href = `/user/${u.id}`
          const active = pathname === href

          return (
            <Link
              key={u.id}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={`rounded-xl p-2 transition ${active ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-3">
                <UserIcon user={u} showFirstInterestUnderAvatar />

                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{u.name}</div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
