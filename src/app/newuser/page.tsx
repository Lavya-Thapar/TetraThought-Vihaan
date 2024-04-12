"use client";

import Hamburger from "hamburger-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
//@ts-ignore
import TypeWriter from "typewriter-effect/dist/core";
import { useRouter } from "next/navigation";

export default function Page() {
  const [optionsVisible, setOptionsVisible] = useState<boolean>(false);
  useEffect(() => {
    const typewriter_heading = new TypeWriter("#type-writer-heading", {
      autoStart: true,
      delay: 75,
    });
    typewriter_heading.typeString("Welcome to StudyBuddy").start();
    const typewriter_intro = new TypeWriter("#type-writer-intro", {
      autoStart: true,
      delay: 15,
    });
    typewriter_intro
      .pauseFor(2000)
      .typeString("Hey there mate")
      .pauseFor(300)
      .typeString(
        ", this is your StudyBuddy, a.k.a., your constant companion to help you deal with any academic stress efficiently and keeping track of your achievements"
      )
      .start();
    const typewriter_head_2 = new TypeWriter("#type-writer-head-2", {
      autoStart: true,
      delay: 25,
    });
    typewriter_head_2
      .pauseFor(6000)
      .typeString(
        "Shall we start by describing how do we feel today, academically?"
      )
      .start()
      .callFunction(() => {
        const options = document.getElementById("options");
        options?.scrollIntoView({ behavior: "smooth" });
        setOptionsVisible(true);
      });
  }, []);
  const options = [
    // deadline
    "Struggling to design a proper schedule?",
    // chatbot
    "Having difficulty understanding a particular topic of any subject?",

    "Any academic achievement that you want to share with us today?",
  ];
  const router = useRouter();
  function handleClick(option: number) {
    if (option == 0) {
      router.replace("/timeline");
    } else if (option == 1) {
      router.replace("/chat");
    } else if (option == 2) {
      router.replace("/achievements");
    } else {
      router.replace("/resources");
    }
  }
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <main className="pb-5 min-h-screen bg-slate-200 text-gray-900">
      <nav className="flex items-center justify-between px-2 py-5 bg-white rounded-b-lg">
        <div className="text-xl font-bold">StudyBuddy</div>
        <div className="lg:hidden">
          <Hamburger toggled={isOpen} toggle={setIsOpen} />
        </div>
        <div
          className={cn(
            "lg:relative lg:flex text-xl bg-[rgba(0,0,0,0.8)] lg:bg-transparent lg:text-slate-800 text-white backdrop-blur-sm px-3 py-5 rounded-lg absolute transition-all right-5 top-16 lg:right-0 lg:top-0",
            {
              "translate-x-0": isOpen,
              "translate-x-56 lg:translate-x-0": !isOpen,
            }
          )}
        >
          <ul className="lg:flex lg:space-x-5">
            <li>
              <button
                className="pb-5 lg:py-0 lg:border-0 border-b block w-full text-left hover:text-blue-400 transition-colors border-muted-foreground"
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                className="py-5 lg:py-0 lg:border-0 border-b block w-full text-left hover:text-blue-400 transition-colors border-muted-foreground"
                onClick={() => router.push("/timeline")}
              >
                Your Schedules
              </button>
            </li>
            <li>
              <button
                className="pt-5 lg:py-0 block w-full text-left hover:text-blue-400 transition-colors border-muted-foreground"
                onClick={() => router.push("/achievements")}
              >
                Your Achievements
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="text-center text-6xl md:text-8xl tracking-wide mt-12">
        <div id="type-writer-heading"></div>
      </div>
      <div className="max-w-prose mx-auto">
        <div
          className="text-xl py-10 px-14 text-muted-foreground md:text-2xl"
          id="type-writer-intro"
        ></div>
      </div>
      <div className="my-8 mx-10 text-3xl" id="type-writer-head-2"></div>
      <div className="relative" id="options">
        {options.map((option, idx) => {
          return (
            <div
              key={idx}
              className={cn("transition-all", {
                "-translate-x-[150vw]": !optionsVisible,
                "translate-x-2": optionsVisible,
                "duration-500": idx == 0,
                "duration-700": idx == 1,
                "duration-1000": idx == 2,
              })}
            >
              <button
                className="tracking-wide text-left px-4 rounded-lg block w-[90vw] py-5 mx-auto my-2 bg-white text-xl border border-slate-100 text-slate-800 hover:bg-slate-300 transition active:bg-emerald-300"
                onClick={() => handleClick(idx)}
              >
                {option}
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
