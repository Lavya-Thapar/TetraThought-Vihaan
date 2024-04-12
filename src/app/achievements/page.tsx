"use client";
import React,{useState} from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type IFormInput = {
  title: string;
  description: string;
  date: Date;
};
type Props = {};
type achievement = {
  title: string;
  description: string;
  date: Date;
};

export default function Achievements({}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [achievements,setAchievements] = useState<achievement[]>(achievementsList);
  const onSubmit = (data: IFormInput) => {
    let temp = [...achievements];
    temp.push(data);
    setAchievements(temp);
  };
  return (
    <>
      <div className="my-6">
        <div className="w-[80%] mx-auto flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Today&apos;s Achivements</h1>
            <p className="text-md">
              Enter your achievements for today. Let&apos;s celebrate your win
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="my-2">
              <div className="flex flex-col gap-2 my-4">
                <label
                  htmlFor="title "
                  className="block text-base font-semibold"
                >
                  Title
                </label>
                <input
                  {...register("title", {
                    required: true,
                    minLength: { value: 5, message: "Title is too small" },
                  })}
                  placeholder="Ran 5K"
                  type="text "
                  name="title"
                  id="title"
                  className="block w-[250px] border-[1px] p-2 border-gray-600 lg:w[350px] rounded-md h-8 outline outline-transparent focus:ring-1 focus:ring-black"
                />
              </div>
              <div className="flex flex-col gap-2 my-4">
                <label className="block" id="description">
                  Description
                </label>
                <textarea
                  className="block w-[250px] border-[1px]  border-gray-600 max-md:w-[55%] md:w-[40%]   rounded-md p-2 outline outline-transparent focus:ring-1 focus:ring-black"
                  {...register("description", { required: true })}
                  placeholder="eg. Ran a 5K in under 30 minutes! "
                />
              </div>
              <div className="flex flex-col gap-2 my-4">
                <label className="block ">
                  Date
                </label>
                <input
                  type="date"
                  {...register("date")}
                  className="block max-w-max border-[1px] p-2 border-gray-600 lg:w[350px] rounded-md h-8 outline outline-transparent focus:ring-1 focus:ring-black"
                ></input>
              </div>
              <input
                type="submit"
                className="bg-black text-white p-2 rounded-md"
              />
            </form>
          </div>
          <hr className="border-gray-200 "></hr>
          <div className=" my-2 ">
            <h2 className="text-2xl font-semibold mb-6">Your Achievements</h2>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4 ">
                {achievements.map((achievement,index)=>{
                    return(
                        <>
                            <div key={index} className=" flex  flex-col gap-2 rounded-md p-4 bg-gray-400">
                                <span className="text-lg font-semibold block">{achievement.title}</span>
                                <p>{achievement.description}</p>
                                <span>{achievement.date.toString()}</span>
                            </div>
                        </>
                    )
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const achievementsList:achievement[] = [
    {
      title: "Completed React project",
      description: "Built a React application from scratch",
      date: new Date("2024-04-01"),
    },
    {
      title: "Published blog post",
      description: "Wrote an article on web development trends",
      date: new Date("2024-03-15"),
    },
    {
      title: "Attended web development conference",
      description: "Participated in a conference on the latest web technologies",
      date: new Date("2024-02-20"),
    },
    {
      title: "Received Employee of the Month award",
      description: "Recognized for outstanding contributions to the team",
      date: new Date("2024-01-10"),
    },
    {
      title: "Completed online course on JavaScript",
      description: "Learned advanced JavaScript concepts and best practices",
      date: new Date("2023-12-05"),
    },
    {
      title: "Contributed to open-source project",
      description: "Submitted pull requests and fixed bugs in a popular open-source project",
      date: new Date("2023-11-20"),
    },
    {
      title: "Attended UX design workshop",
      description: "Learned principles of user experience design and usability testing",
      date: new Date("2023-10-15"),
    },
    {
      title: "Volunteered at local coding bootcamp",
      description: "Mentored aspiring developers and helped with coding exercises",
      date: new Date("2023-09-10"),
    },
    {
      title: "Launched personal portfolio website",
      description: "Showcased projects and skills on a custom-built portfolio website",
      date: new Date("2023-08-05"),
    },
    {
      title: "Completed 100 Days of Code challenge",
      description: "Coded for at least one hour every day for 100 days straight",
      date: new Date("2023-07-01"),
    },
  ];