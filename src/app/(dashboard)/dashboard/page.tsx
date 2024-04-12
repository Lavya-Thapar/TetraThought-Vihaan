"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { status, data: session } = useSession();
  const router = useRouter();
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
      }
    }
    if (status == "unauthenticated") {
      router.replace("/login");
    }
    if (status == "authenticated") {
      handle_user_login();
    }
  }, [status, router, session]);
  return <div></div>;
}
