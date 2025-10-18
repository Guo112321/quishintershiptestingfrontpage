'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useUsers } from '@/lib/users'
import { getMoodById, getInterestById } from '@/lib/tagLookup'
import EditUserDialog from '@/components/user/EditUserDialog'

export default function UserProfile({ userId }: { userId: number }) {
  const { getById, update } = useUsers()
  const user = getById(userId)
  const [open, setOpen] = useState(false)

  if (!user) return null

  const mood = getMoodById(user.moodTagId)
  const interests = (user.interests ?? []).map(id => getInterestById(id)).filter(Boolean)

  // 设为“第一位”= 把该 id 移到 interests[0]
  const setPrimaryInterest = (id: string) => {
    const rest = user.interests.filter(x => x !== id)
    update(user.id, { interests: [id, ...rest] })
  }

  const primaryId = user.interests?.[0]

  return (
    <div className="max-w-2xl">
      {/* 顶部卡片 */}
      <div className="rounded-2xl border p-6 bg-white">
        <div className="flex items-center gap-5">
          <Image
            src={user.avatar || '/avatars/default.jpg'}
            alt={user.name}
            width={96}
            height={96}
            className="rounded-full object-cover"
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold truncate">{user.name}</h1>
              {mood && (
                <span className="text-sm px-2 py-0.5 rounded-full border bg-gray-50" title={mood.tagName}>
                  {mood.tagDescription}
                </span>
              )}
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border
                  ${user.single ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-gray-50'}`}>
                {user.single ? '单身' : '非单身'}
              </span>
              <span className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full border bg-gray-50">
                <span className={`w-2.5 h-2.5 rounded-full ${user.online ? 'bg-green-500' : 'bg-gray-300'}`} />
                {user.online ? '在线' : '离线'}
              </span>
              <span className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full border bg-gray-50">
                {user.identity === 'self' ? '本人' : '好友'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setOpen(true)}
            disabled={user.identity !== 'self'}
            className="px-3 py-1.5 text-sm rounded border hover:bg-gray-50 disabled:opacity-40"
          >
            编辑信息
          </button>
        </div>

        {/* 兴趣标签区 */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">兴趣标签</div>
            <div className="text-xs text-gray-500">
              首选用于左侧昵称下方展示
            </div>
          </div>

          {interests.length === 0 ? (
            <div className="mt-3 text-sm text-gray-500">暂无兴趣标签</div>
          ) : (
            <ul className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {interests.map(tag => {
                const isPrimary = tag!.tagId === primaryId
                return (
                  <li key={tag!.tagId}>
                    <div
                      className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg border text-sm
                        ${isPrimary ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-50/60 text-gray-800 border-gray-200'}`}
                    >
                      <span className="truncate">{tag!.tagName}</span>

                      {/* 设为首选按钮：仅本人可操作 */}
                      {user.identity === 'self' && (
                        <button
                          onClick={() => setPrimaryInterest(tag!.tagId)}
                          disabled={isPrimary}
                          className={`shrink-0 px-2 py-0.5 rounded text-xs border
                            ${isPrimary
                              ? 'opacity-70 cursor-default border-white/40'
                              : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-700'}`}
                          title={isPrimary ? '当前首选' : '设为首选'}
                        >
                          {isPrimary ? '首选' : '设为首选'}
                        </button>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      {/* 弹窗 */}
      <EditUserDialog open={open} onClose={() => setOpen(false)} userId={user.id} />
    </div>
  )
}
