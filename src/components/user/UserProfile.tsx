"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUsers } from "@/lib/users";
import { getMoodById, getInterestById } from "@/lib/tagLookup";
import EditUserDialog from "@/components/user/EditUserDialog";

export default function UserProfile({ userId }: { userId: number }) {
  const router = useRouter();
  const { getById } = useUsers();
  const user = getById(userId);
  const [openEditor, setOpenEditor] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const set = () => setIsMobile(mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);
  if (!user) return null;

  const mood = getMoodById(user.moodTagId);
  const interests = (user.interests ?? []).map(getInterestById).filter(Boolean);
  const primaryId = user.interests?.[0];

  const closeSheet = () => {
    setSheetOpen(false);
    setTimeout(() => router.replace("/user"), 250);
  };

  const ProfileBody = (
    <div className="rounded-2xl border p-6 bg-white">
      <div className="flex items-center gap-5">
        <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0">
          <Image
            src={user.avatar || "/avatars/default.jpg"}
            alt={user.name}
            fill
            sizes="96px"
            className="object-cover object-center"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold truncate">{user.name}</h1>
            {mood && (
              <span
                className="text-sm px-2 py-0.5 rounded-full"
                title={mood.tagName}
              >
                {mood.tagDescription}
              </span>
            )}
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border ${
                user.single
                  ? "bg-amber-50 border-amber-200 text-amber-700"
                  : "bg-gray-50"
              }`}
            >
              {user.single ? "单身" : "非单身"}
            </span>
            <span className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full border bg-gray-50">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  user.online ? "bg-green-500" : "bg-gray-300"
                }`}
              />
              {user.online ? "在线" : "离线"}
            </span>
            <span className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full border bg-gray-50">
              {user.identity === "self" ? "本人" : "好友"}
            </span>
          </div>
        </div>

        <button
          onClick={() => setOpenEditor(true)}
          disabled={user.identity !== "self"}
          className="hidden md:inline px-3 py-1.5 text-sm rounded border hover:bg-gray-50 disabled:opacity-40"
        >
          编辑信息
        </button>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">兴趣标签</div>
          <div className="text-xs text-gray-500">首选将显示在左侧昵称下方</div>
        </div>

        {interests.length === 0 ? (
          <div className="mt-3 text-sm text-gray-500">暂无兴趣标签</div>
        ) : (
          <ul className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {interests.map((tag) => {
              const isPrimary = tag!.tagId === primaryId;
              return (
                <li key={tag!.tagId}>
                  <div
                    className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg border text-sm ${
                      isPrimary
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-50/60 text-gray-800 border-gray-200"
                    }`}
                  >
                    <span className="truncate">{tag!.tagName}</span>
                    {isPrimary && (
                      <span className="shrink-0 px-2 py-0.5 rounded text-xs border border-white/40 opacity-90">
                        首选
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="w-full mx-auto hidden md:block max-w-2xl">{ProfileBody}</div>

      {isMobile && (
        <div
          className={`md:hidden fixed inset-0 z-50 flex items-end justify-center transition-colors duration-200 ${
            sheetOpen ? "bg-black/30" : "bg-black/0"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`absolute left-0 right-0 bottom-0 rounded-t-2xl bg-white shadow-xl
                        transition-transform duration-250 ease-out will-change-transform
                        ${sheetOpen ? "translate-y-0" : "translate-y-full"}`}
          >
            <div className="sticky top-0 z-10 h-12 flex items-center gap-3 px-3 border-b bg-white/90 backdrop-blur">
              <button
                onClick={closeSheet}
                className="px-2 py-1 rounded-lg border text-sm active:scale-[0.98]"
              >
                返回
              </button>
              <div className="text-base font-medium truncate">{user.name}</div>
              <div className="ml-auto">
                <button
                  onClick={() => setOpenEditor(true)}
                  disabled={user.identity !== "self"}
                  className="px-2.5 py-1 text-xs rounded border hover:bg-gray-50 disabled:opacity-40"
                >
                  编辑信息
                </button>
              </div>
            </div>

            <div className="p-4 max-h-[78vh] overflow-y-auto">
              {ProfileBody}
            </div>
          </div>
        </div>
      )}

      <EditUserDialog
        open={openEditor}
        onClose={() => setOpenEditor(false)}
        userId={user.id}
      />
    </>
  );
}
