"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { tagGroups } from "@/data/data";
import { getMoodById } from "@/lib/tagLookup";
import { useUsers } from "@/lib/users";

type Props = { open: boolean; onClose: () => void; userId: number };

export default function EditUserDialog({ open, onClose, userId }: Props) {
  const { getById, update } = useUsers();
  const user = getById(userId);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [moodId, setMoodId] = useState<string>("");
  const [interests, setInterests] = useState<string[]>([]);
  const [activeCatIdx, setActiveCatIdx] = useState(0);

  const interestGroups = useMemo(
    () => tagGroups.filter((g) => g.categoryType === "interest_tags"),
    []
  );
  const moodOptions = useMemo(
    () => tagGroups.find((g) => g.categoryType === "mood_tags")?.tags ?? [],
    []
  );

  useEffect(() => {
    if (!open || !user) return;
    setName(user.name);
    setAvatar(user.avatar);
    setMoodId(user.moodTagId);
    setInterests(user.interests ?? []);
  }, [open, user]);

  if (!open || !user) return null;

  const toggleInterest = (id: string) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const save = () => {
    if (user.identity !== "self") return onClose();
    update(user.id, { name, avatar, moodTagId: moodId, interests });
    onClose();
  };

  const onPickAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatar(url);
  };

  const mood = getMoodById(moodId);

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="w-[700px] max-w-[92vw] bg-white rounded-2xl shadow-xl">
        {/* 头 */}
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <div className="text-base font-medium">编辑个人信息</div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {/* 内容 */}
        <div className="p-5 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* 头像 */}
          <div>
            <div className="text-sm mb-2">头像</div>
            <div className="flex items-center gap-4">
              <Image
                src={avatar || user.avatar || "/avatars/default.jpg"}
                alt={user.name}
                width={100}
                height={100}
                className="rounded-full object-cover"
              />
              <label className="px-3 py-1.5 text-sm rounded border cursor-pointer hover:bg-gray-50">
                选择图片
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onPickAvatar}
                />
              </label>
            </div>
          </div>

          {/* 昵称 */}
          <div>
            <div className="text-sm mb-2">昵称</div>
            <input
              className="w-full rounded border px-3 py-2 text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="请输入昵称"
              disabled={user.identity !== "self"}
            />
          </div>

          <div className="border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">兴趣标签（可多选）</div>
              <div className="text-xs text-gray-500">
                已选 <span className="font-medium">{interests.length}</span> 项
              </div>
            </div>

            {/* 一级分类：分段切换栏 */}
            <div className="mt-3">
              <div
                className="flex gap-2 overflow-x-auto pb-2"
                role="tablist"
                aria-label="兴趣分类切换"
              >
                {interestGroups.map((g, idx) => {
                  const active = activeCatIdx === idx;
                  return (
                    <button
                      key={g.categoryDescription}
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveCatIdx(idx)}
                      className={`px-3 py-1.5 rounded-full border text-sm whitespace-nowrap transition
              ${
                active
                  ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                  : "bg-white hover:bg-gray-50"
              }`}
                    >
                      {g.categoryDescription}
                    </button>
                  );
                })}
              </div>

              <div className="h-px bg-gray-200" />
            </div>

            {/* 二级标签：轻量 chips */}
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {interestGroups[activeCatIdx]?.tags.map((t) => {
                const checked = interests.includes(t.tagId);
                return (
                  <button
                    key={t.tagId}
                    onClick={() => toggleInterest(t.tagId)}
                    className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition
    ${
      checked
        ? "bg-blue-600 text-white border-blue-600"
        : "bg-gray-50/60 text-gray-700 border-gray-200 hover:bg-gray-50"
    }`}
                    aria-pressed={checked}
                  >
                    <span className="truncate">{t.tagName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 选择心情（单选） */}
          <div>
            <div className="text-sm mb-2">此刻心情（单选）</div>
            <div className="flex flex-wrap gap-2">
              {moodOptions.map((m) => (
                <button
                  key={m.tagId}
                  onClick={() => setMoodId(m.tagId)}
                  className={`px-3 py-1.5 text-sm rounded-full border transition ${
                    moodId === m.tagId
                      ? "bg-amber-500 text-white border-amber-500"
                      : "hover:bg-gray-50"
                  }`}
                  title={m.tagName}
                >
                  {m.tagDescription} {/* 直接展示 emoji */}
                </button>
              ))}
            </div>
            {mood && (
              <div className="mt-2 text-xs text-gray-500">
                已选：{mood.tagName}
              </div>
            )}
          </div>
        </div>

        {/* 底部 */}
        <div className="px-5 py-4 border-t flex justify-end gap-3">
          <button
            className="px-4 py-2 text-sm rounded border hover:bg-gray-50"
            onClick={onClose}
          >
            取消
          </button>
          <button
            className="px-4 py-2 text-sm rounded bg-gray-900 text-white disabled:opacity-40"
            onClick={save}
            disabled={user.identity !== "self"}
          >
            保存更改
          </button>
        </div>
      </div>
    </div>
  );
}
