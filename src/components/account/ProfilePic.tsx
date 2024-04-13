"use client";
import { Account } from "@/types/user";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePic() {
  const { data: session } = useSession();
  const [user, setUser] = useState<Account | null>(null);
  useEffect(() => {
    if (session && session.user && session.user.email && session.user.image) {
      const account: Account = {
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
    <div>
      {user && user.photoBase64 ? (
        <Image
          src={`data:image/png;base64,${user.photo}`}
          referrerPolicy="no-referrer"
          alt=""
          width={260}
          height={260}
        />
      ) : (
        user?.photo && (
          <Image
            src={user.photo}
            referrerPolicy="no-referrer"
            alt=""
            width={260}
            height={260}
          />
        )
      )}
    </div>
  );
}
