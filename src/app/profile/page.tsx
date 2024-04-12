"use client";

import ProfilePic from "@/components/account/ProfilePic";

import { useEffect, useState } from "react";
import React from "react";
import { useSession } from "next-auth/react";
import { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";

export default function UserInfoContainer() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  useEffect(() => {
    if (session && session.user && session.user.email && session.user.image) {
      const account: User = {
        email: session.user.email,
        name: "Manikya",
        photo: session.user.image,
        photoBase64: false,
        achievements: [],
      };
      setUser(account);
    }
  }, [session]);

  return (
    <div className="min-h-screen flex flex-col">
      <Button>{/* TODO*/}</Button>
      <div className="flex-1 flex flex-col items-center justify-center w-full md:gap-32">
        <div className="flex flex-col items-center space-y-3 pt-[4rem] text-center -translate-y-1/2 md:translate-y-0">
          <div className="flex h-32 w-32 md:h-52 md:w-52 flex-col items-center justify-center overflow-hidden rounded-full bg-slate-300 align-middle dark:border-2 dark:border-slate-400">
            <ProfilePic />
          </div>
          <p className="text-3xl md:text-7xl">{session?.user?.name}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {session?.user?.email}
          </p>
          <div className="text-muted-foreground my-10 h-[3px] w-[80%] bg-slate-500" />
          <div className="text-muted-foreground">
            Achievements: {user?.achievements.length}
          </div>
        </div>
        <div className="flex items-center justify-around gap-5 w-full px-5 max-w-prose">
          <button className="text-center sm:text-lg flex-1 py-10 rounded-lg bg-slate-200 text-sm hover:bg-slate-800 hover:text-slate-200 transition-colors">
            Achievements
          </button>
          <button className="text-center sm:text-lg flex-1 py-10 rounded-lg bg-slate-200 text-sm hover:bg-slate-800 hover:text-slate-200 transition-colors">
            Schedule
          </button>
          <button className="text-center sm:text-lg flex-1 py-10 rounded-lg bg-slate-200 text-sm hover:bg-slate-800 hover:text-slate-200 transition-colors">
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
