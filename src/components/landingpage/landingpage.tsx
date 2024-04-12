import React from "react";
import { Button } from "../ui/button";
import { Inter } from "next/font/google";
import Hero from "./Hero";
import Cards from "../ui/landingpage/Cards";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

import Link from "next/link";

export default function LandingPage() {
  const features = [
    {
      title: "Schedule Generator",
      content:
        "Interactively help the user in creating a schedule which sets realistic goals.",
    },
    {
      title: "Achievement Tracker",
      content:
        "Keep track of the achievements and deadlines of the user to motivate him/her as well as prevent procrastination.",
    },
    {
      title: "Mental Health Guide",
      content:
        "Provide personalised guidance according to the profile of the users to provide mental peace and help them identify their achievements/failures.",
    },
    {
      title: "Resource Suggester",
      content:
        "Identify the subjects where users lag and collect resources in a single place to help them.",
    },
  ];

  return (
    <>
      <div className="flex w-[80%] mx-auto p-4 my-5 align-center justify-between">
        <img src="/logo.png" className="w-56" width={224} height={150}/>
        <div className="flex flex-col justify-center">
            <Button>
                <Link href={'/login'}>
                    Log In
                </Link>
            </Button>
        </div>
      </div>
      <Hero></Hero>

      <div>
        <div className={inter.variable + inter.variable}>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
                <img
                  alt="chatbot image"
                  className="mx-auto animate-bounce  rounded-xl object-cover object-center sm:max-lg:w-[50%] lg:w-[80%] lg:order-last"
                  height="150"
                  src="/chatbot.jpg"
                  width="200"
                  style={{
                    animationDuration: "1.5s",
                    animationTimingFunction: "ease-in-out",
                    animationIterationCount: "infinite",
                  }}
                />
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                      Personalized Assistance
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                      Your AI Study Buddy
                    </h2>
                    <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                      Let the chatbot handle the details, so you can focus on
                      learning. Personalized assistance available 24/7.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm text-gray-600 font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300">
                      <Link href={"#"}>Tour the Platform</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Features
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Explore the features of our Study Buddy Chatbot.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => {
                  return (
                    <Cards
                      key={index}
                      title={feature.title}
                      content={feature.content}
                    ></Cards>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
