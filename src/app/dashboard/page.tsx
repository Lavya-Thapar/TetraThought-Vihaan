"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status == "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);
  return (
    <div>
      Dashboard
      <Button className="block" onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  );
}
