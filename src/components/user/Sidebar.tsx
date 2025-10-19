'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import UserIcon from './Usericon'
import { useUsers } from '@/lib/users'

export default function Sidebar() {
  const pathname = usePathname()
  const { members } = useUsers()

  return (
    <aside
      className="
        md:w-64 w-full
        shrink-0 border-r
        md:h-[100dvh] h-auto
        overflow-y-auto
        p-3
      "
    >
      <div className="mb-3 text-xs text-gray-500">空间成员（{members.length}）</div>

      {/* 始终竖排 */}
      <div className="flex flex-col gap-2">
        {members.map((u) => {
          const href = `/user/${u.id}`
          const active = pathname === href

          return (
            <Link
              key={u.id}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={`rounded-xl p-2 transition ${
                active ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-5">
                {/* 固定尺寸容器：小屏略小，md 及以上保持你原来的尺寸 */}
                <div className="
                  w-[96px] h-[118px]
                  md:w-[110px] md:h-[130px]
                  shrink-0 flex items-center justify-center
                ">
                  <UserIcon user={u} showFirstInterestUnderAvatar />
                </div>

                {/* 右侧文字：小屏轻微上移并变小，md 恢复你原样 */}
                <div className="min-w-0 -mt-10 md:-mt-15">
                  <div className="text-[16px] md:text-[19px] font-semibold leading-snug truncate">
                    {u.name}
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
