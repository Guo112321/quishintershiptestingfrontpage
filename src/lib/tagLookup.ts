// src/lib/tagLookup.ts
import { tagGroups, type Tag } from '@/data/data'

// 1) 从分组数据中拍平出两个数组
export const interest_tags: Tag[] = tagGroups
  .filter(g => g.categoryType === 'interest_tags')
  .flatMap(g => g.tags)

export const mood_tags: Tag[] = tagGroups
  .filter(g => g.categoryType === 'mood_tags')
  .flatMap(g => g.tags)

// 2) 构建 O(1) 查找的 Map
const interestById = new Map(interest_tags.map(t => [t.tagId, t]))
const moodById = new Map(mood_tags.map(t => [t.tagId, t]))

// 3) 导出查询函数（组件里直接用）
export function getInterestById(id?: string | null): Tag | null {
  if (!id) return null
  return interestById.get(id) ?? null
}

export function getMoodById(id?: string | null): Tag | null {
  if (!id) return null
  return moodById.get(id) ?? null
}

// 4) 语法糖：直接取名称/描述（兜底空串）
export const getInterestNameById = (id?: string | null) =>
  getInterestById(id)?.tagName ?? ''

export const getMoodDescriptionById = (id?: string | null) =>
  getMoodById(id)?.tagDescription ?? ''
