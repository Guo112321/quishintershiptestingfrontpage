'use client'
import { createContext, useContext, useMemo, useState, ReactNode } from 'react'
import { members as seed } from '@/data/userData'

export type Identity = 'self' | 'friend'
export type Member = typeof seed[number]

type Ctx = {
  members: Member[]
  getById: (id: number) => Member | undefined
  update: (id: number, patch: Partial<Member>) => void
}

const UsersCtx = createContext<Ctx | null>(null)
export function UsersProvider({ children}: {children: ReactNode }){
    const [members, setMembers] = useState<Member[]>(seed)

    const api = useMemo<Ctx>(() => ({
        members,
        getById: (id) => members.find(m => m.id === id),
        update: (id, patch) => setMembers(prev => prev.map(m => (m.id === id ? { ...m, ...patch } as Member : m))),

    }), [members])
    return <UsersCtx.Provider value={api}>{children}</UsersCtx.Provider>
}

export function useUsers() {
  const ctx = useContext(UsersCtx)
  if (!ctx) throw new Error('useUsers must be used within <UsersProvider>')
  return ctx
}