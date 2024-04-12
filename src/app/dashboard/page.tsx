"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [firstTime, setFirstTime] = useState<boolean>(false);
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status == "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);
  // determine first time login
  // useEffect(() => {
  //   // TODO: Dummy for now
  //   setFirstTime(true);
  //   router.push("/newuser");
  // }, [router]);
  return (
    <div>
      Dashboard
      <Button className="block" onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  );
}
