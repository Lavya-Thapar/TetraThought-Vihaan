"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Account } from "@/types/user";
import ProfilePic from "@/components/account/ProfilePic";
import Link from "next/link";

export default function Dashboard() {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<Account | null>(null);
  useEffect(() => {
    async function handle_user_login() {
      const rawAccount = await fetch(
        `/api/accounts?email=${session?.user?.email}`
      );
      const account = await rawAccount.json();
      if (account == null) {
        // new user
        await fetch("/api/accounts", {
          method: "POST",
          headers: { "Content-Type": "application.json" },
          body: JSON.stringify({
            email: session?.user?.email,
            photo: session?.user?.image,
            name: session?.user?.name,
            photoBase64: true,
            achievements: [],
          }),
        });
        router.push("/newuser");
      } else {
        // existing user, do nothing
        setUser(account);
      }
    }
    if (status == "unauthenticated") {
      router.replace("/login");
    }
    if (status == "authenticated") {
      handle_user_login();
    }
  }, [status, router, session]);

  return (
    <div className="opacity-0 md:opacity-100 h-screen w-[calc(100vw-250px)] flex items-center justify-center">
      <div className="min-h-screen flex flex-col">
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
            <Link
              href="/achievements"
              className="text-center sm:text-lg flex-1 py-10 rounded-lg bg-slate-200 text-sm hover:bg-slate-800 hover:text-slate-200 transition-colors"
            >
              Achievements
            </Link>
            <Link
              href="/timeline"
              className="text-center sm:text-lg flex-1 py-10 rounded-lg bg-slate-200 text-sm hover:bg-slate-800 hover:text-slate-200 transition-colors"
            >
              Schedule
            </Link>
            <Link
              href="/dashboard"
              className="text-center sm:text-lg flex-1 py-10 rounded-lg bg-slate-200 text-sm hover:bg-slate-800 hover:text-slate-200 transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
