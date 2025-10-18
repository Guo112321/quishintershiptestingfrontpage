"use client";
import Image from "next/image";
import { getMoodById, getInterestById } from "@/lib/tagLookup";

interface UserIconProps {
  user: {
    id: number;
    name: string;
    avatar?: string;
    moodTagId: string;
    single: boolean;
    online: boolean;
    identity: "self" | "friend";
    interests: string[];
  };
  showFirstInterestUnderAvatar?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function UserIcon({
  user,
  showFirstInterestUnderAvatar = true,
  className = "",
  onClick,
}: UserIconProps) {
  const mood = getMoodById(user.moodTagId);
  const firstTag = user.interests?.[0]
    ? getInterestById(user.interests[0])
    : null;
  const avatarSrc = user.avatar || "/avatars/default.jpg";

  return (
    <div className={`relative inline-block ${className}`} onClick={onClick}>
      <div className="relative w-[100px] h-[100px] z-0">
        <Image
          src={avatarSrc}
          alt={user.name}
          width={100}
          height={100}
          className="rounded-full object-cover"
        />

        {/* 左上：心情 */}
        {mood && (
          <span
            className="absolute -top-1 -left-1 text-[10px] bg-white/90 px-1 rounded border shadow-sm"
            title={mood.tagName}
          >
            {mood.tagDescription}
          </span>
        )}

        {/* 右上：单身 */}
        {user.single && (
          <Image
            src="/icons/single.jpg"
            alt="single"
            width={30}
            height={16}
            className="absolute -top-1 -right-1 rounded-full border border-white shadow"
          />
        )}

        {/* 右下：在线状态 */}
        <span
          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ring-2 ring-white ${
            user.online ? "bg-green-500" : "bg-gray-300"
          }`}
          title={user.online ? "在线" : "离线"}
        />
      </div>
      {/* 头像下方 chip（可选） */}
      {showFirstInterestUnderAvatar && firstTag && (
        <div
          className="mt-2 relative z-10 text-[15px] leading-tight px-2 py-0.5
                    bg-gray-100 rounded-full truncate max-w-[15rem] text-center"
        >
          {firstTag.tagName}
        </div>
      )}
    </div>
  );
}
