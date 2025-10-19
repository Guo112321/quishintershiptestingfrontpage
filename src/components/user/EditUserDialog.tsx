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

  // 本地表单状态
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [moodId, setMoodId] = useState<string>("");
  const [interests, setInterests] = useState<string[]>([]);
  const [single, setSingle] = useState(false);
  const [online, setOnline] = useState(false);
  const [activeCatIdx, setActiveCatIdx] = useState(0);

  // 过滤掉与心情重复的兴趣分组：「线下交友活动-心情标签」
  const interestGroups = useMemo(
    () =>
      tagGroups.filter(
        (g) =>
          g.categoryType === "interest_tags" &&
          g.categoryDescription !== "线下交友活动-心情标签"
      ),
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
    setSingle(user.single);
    setOnline(user.online);
  }, [open, user]);

  if (!open || !user) return null;

  const canEdit = user.identity === "self";

  const toggleInterest = (id: string) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // 设为首选：把该 id 移到 interests[0]
  const setPrimaryInterest = (id: string) => {
    setInterests((prev) => {
      const rest = prev.filter((x) => x !== id);
      return [id, ...rest];
    });
  };

  const save = () => {
    if (!canEdit) return onClose();
    update(user.id, {
      name,
      avatar,
      moodTagId: moodId,
      interests,
      single,
      online,
    });
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
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30">
      {/* Bottom Sheet 容器 */}
      <div className="w-full max-w-[900px] bg-white rounded-t-2xl shadow-xl">
        {/* 头 */}
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <div className="text-base font-medium">编辑个人信息</div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="关闭"
          >
            ×
          </button>
        </div>

        {/* 内容（可滚动） */}
        <div className="p-5 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* 顶部：头像 + 右侧信息（昵称/单身/在线/上传） */}

          {/* 顶部：左头像 + 右控制行（整行垂直居中） */}
          <div className="flex items-center gap-8">
            {/* 左：头像与按钮 */}
            <div className="w-[140px] shrink-0 flex flex-col items-center">
              <Image
                src={avatar || user.avatar || "/avatars/default.jpg"}
                alt={user.name}
                width={120}
                height={120}
                className="rounded-full object-cover"
              />
              <label className="mt-3 inline-block px-3 py-1.5 text-sm rounded border cursor-pointer hover:bg-gray-50">
                选择图片
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onPickAvatar}
                />
              </label>
            </div>

            {/* 右：昵称输入 + 单身开关 + 在线开关（同一行） */}
            <div className="flex items-center gap-6 flex-wrap">
              {/* 昵称（行内标签，不在上面） */}
              <label htmlFor="nickname" className="text-sm text-gray-600">
                昵称
              </label>
              <input
                id="nickname"
                className="h-10 w-[360px] max-w-[52vw] rounded border px-3 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="请输入昵称"
                disabled={!canEdit}
              />

              {/* 单身开关（行内） */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">单身</span>
                <button
                  type="button"
                  disabled={!canEdit}
                  onClick={() => setSingle((v) => !v)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition
          ${single ? "bg-amber-500" : "bg-gray-300"} ${
                    !canEdit ? "opacity-40 cursor-not-allowed" : ""
                  }`}
                  aria-pressed={single}
                  aria-label="切换单身状态"
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition
          ${single ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
              </div>

              {/* 在线开关（行内） */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">在线</span>
                <button
                  type="button"
                  disabled={!canEdit}
                  onClick={() => setOnline((v) => !v)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition
          ${online ? "bg-green-500" : "bg-gray-300"} ${
                    !canEdit ? "opacity-40 cursor-not-allowed" : ""
                  }`}
                  aria-pressed={online}
                  aria-label="切换在线状态"
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition
          ${online ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 兴趣标签 */}
          <div className="border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">兴趣标签（可多选）</div>
              <div className="text-xs text-gray-500">
                已选 <span className="font-medium">{interests.length}</span> 项
              </div>
            </div>

            {/* 当前首选展示 */}
            <div className="mt-2 text-xs text-gray-500">
              首选用于侧边栏展示的第一条兴趣。
              {interests[0] && (
                <span className="ml-2 inline-block px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  当前首选：{interests[0]}
                </span>
              )}
            </div>

            {/* 一级分类：分段切换栏（已过滤掉“线下交友活动-心情标签”） */}
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

            {/* 二级标签列表（带滚动、可设首选） */}
            <div className="mt-3 max-h-60 overflow-y-auto pr-1">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {interestGroups[activeCatIdx]?.tags.map((t) => {
                  const checked = interests.includes(t.tagId);
                  const isPrimary = interests[0] === t.tagId;

                  const tileBase =
                    "flex items-center justify-between gap-2 rounded-lg border px-2 py-2 text-sm cursor-pointer select-none outline-none transition";
                  const tileStyle = checked
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-50/60 text-gray-800 border-gray-200 hover:bg-gray-100";
                  const tileDisabled = !canEdit
                    ? "opacity-50 cursor-not-allowed"
                    : "";

                  return (
                    <div
                      key={t.tagId}
                      role="button"
                      tabIndex={0}
                      aria-pressed={checked}
                      aria-label={`兴趣：${t.tagName}${
                        checked ? "（已选）" : ""
                      }`}
                      className={`${tileBase} ${tileStyle} ${tileDisabled}`}
                      onClick={() => canEdit && toggleInterest(t.tagId)}
                      onKeyDown={(e) => {
                        if (!canEdit) return;
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleInterest(t.tagId);
                        }
                      }}
                      title={checked ? "点击取消选择" : "点击选择"}
                    >
                      {/* 左：名字（整块可点） */}
                      <span className="truncate">{t.tagName}</span>

                      {/* 右：设为首选（独立按钮，阻止冒泡） */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!canEdit || !checked || isPrimary) return;
                          setPrimaryInterest(t.tagId);
                        }}
                        disabled={!canEdit || !checked || isPrimary}
                        className={`shrink-0 px-2 py-0.5 rounded text-xs border transition
              ${
                isPrimary
                  ? "opacity-70 cursor-default border-white/40"
                  : checked
                  ? "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                  : "bg-white/70 text-gray-500 border-gray-200"
              }`}
                        title={
                          isPrimary
                            ? "当前首选"
                            : checked
                            ? "设为首选"
                            : "先选择该兴趣，再设为首选"
                        }
                      >
                        {isPrimary ? "首选" : "设为首选"}
                      </button>
                    </div>
                  );
                })}
              </div>
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
                  disabled={!canEdit}
                  className={`px-3 py-1.5 text-sm rounded-full border transition ${
                    moodId === m.tagId
                      ? "bg-amber-500 text-white border-amber-500"
                      : "hover:bg-gray-50"
                  } ${!canEdit ? "opacity-40 cursor-not-allowed" : ""}`}
                  title={m.tagName}
                >
                  {m.tagDescription}
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

        {/* 底部操作 */}
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
            disabled={!canEdit}
          >
            保存更改
          </button>
        </div>
      </div>
    </div>
  );
}
