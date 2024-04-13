"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash } from "lucide-react";
import { useRef, useState } from "react";
import { format } from "date-fns";

export default function Page() {
  const [tasks, setTasks] = useState<
    Array<{
      name: string;
      time: number;
      deadline: Date;
    }>
  >([]);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const timeRef = useRef<HTMLInputElement | null>(null);
  const deadlineRef = useRef<HTMLInputElement | null>(null);
  const addColumn = () => {
    setTasks([
      ...tasks,
      {
        deadline: new Date(deadlineRef.current?.value ?? ""),
        name: nameRef.current?.value ?? "",
        time: new Number(timeRef.current?.value).valueOf(),
      },
    ]);
    if (deadlineRef.current) deadlineRef.current.value = "";
    if (nameRef.current) nameRef.current.value = "";
    if (timeRef.current) timeRef.current.value = "";
  };
  const submitDetails = async () => {
    const raw_result = await fetch("/api/scheduler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tasks: [
          tasks.map((task) => {
            return {
              ...task,
              deadline: format(task.deadline, "dd-MM-yyyy"),
            };
          }),
        ],
      }),
    });
    const result = await raw_result.json();
    console.log(result);
  };
  return (
    <div className="px-2">
      <h1 className="text-5xl text-center py-5 tracking-tighter">
        Task Schedule Generator
      </h1>
      <div className="flex flex-col space-y-5">
        {tasks.map((task) => {
          return (
            <div key={task.name}>
              <div className="flex items-end justify-around w-full gap-2 text-xl">
                <div className="flex-1">{task.name}</div>

                <div className="flex-1">{task.time}</div>

                <div className="flex-1">
                  {format(task.deadline, "dd-MM-yyyy")}
                </div>
                <Button variant={"destructive"}>
                  <Trash />
                </Button>
              </div>
              <hr className="my-5" />
            </div>
          );
        })}
        <div className="flex items-end justify-around w-full gap-2 text-xl">
          <div className="flex-1">
            <label className="text-center block" htmlFor="name">
              Task Name
            </label>
            <Input className="block" id="name" ref={nameRef} />
          </div>

          <div className="flex-1">
            <label className="text-center block" htmlFor="time">
              Time needed to complete (in hours)
            </label>
            <Input className="block" id="time" type="tel" ref={timeRef} />
          </div>

          <div className="flex-1">
            <label className="text-center block" htmlFor="deadline">
              Deadline
            </label>
            <Input
              className="block"
              id="deadline"
              type="date"
              ref={deadlineRef}
            />
          </div>
          <Button onClick={addColumn}>
            <Plus />
          </Button>
        </div>
      </div>
      <Button
        className="block my-5 mx-auto"
        variant={"default"}
        onClick={submitDetails}
      >
        Generate Schedule
      </Button>
    </div>
  );
}
