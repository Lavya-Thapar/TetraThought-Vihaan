"use client";
import { cn } from "@/lib/utils";
import { Github, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
interface Props {
  provider: "github";
}

const Tile = ({ provider }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  async function loadSigning(via: "github") {
    setLoading(true);
    const load = await signIn(via);
    if (load?.ok) {
      setLoading(false);
      localStorage.setItem("logged-in", "true");
    }
  }

  return (
    <div
      className={cn(
        "text-md flex max-w-md cursor-pointer items-center justify-start gap-2 rounded-lg bg-slate-200 px-5 py-2 text-black/70 hover:bg-black/80 hover:text-white/80 dark:bg-black/80 dark:text-white/90 dark:hover:bg-white/60 dark:hover:text-black"
      )}
      aria-roledescription="button"
      onClick={() => {
        loadSigning(provider);
      }}
    >
      {loading ? (
        <div>
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      ) : (
        <>
          {provider === "github" && (
            <div className="flex items-center gap-2">
              <Github /> Login via Github
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tile;
