import type { ReactNode } from "react";
import Sidebar from "@/components/user/Sidebar";
import { UsersProvider } from "@/lib/users";

export const metadata = { title: "用户空间" };

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <UsersProvider>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-[100dvh] p-6">{children}</main>
      </div>
    </UsersProvider>
  );
}
