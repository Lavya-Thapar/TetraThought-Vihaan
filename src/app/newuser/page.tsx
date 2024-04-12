"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
//@ts-ignore
import TypeWriter from "typewriter-effect/dist/core";

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
      delay: 25,
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
      .pauseFor(8000)
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
    // resources
    "Want online resources to understand any concept?",
  ];
  function handleClick(option: number) {}
  return (
    <main className="py-5 min-h-screen bg-slate-200 text-gray-900">
      <Navbar />
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
                "duration-300": idx == 0,
                "duration-500": idx == 1,
                "duration-700": idx == 2,
                "duration-1000": idx == 3,
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
