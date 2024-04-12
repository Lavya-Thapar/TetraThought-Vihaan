"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Menu,
  MenuIcon,
} from "lucide-react";
import Link from "next/link";
import DropDown from "./DropDown";
type Props = {};

const SideBar = (props: Props) => {
  const navlinks = ["Chat", "Resources", "Scheduler", "Achievements"];
  const dropLinks = ["calender", "timeline"];
  const [open, setOpen] = useState<boolean>(true);
  const handleClick = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  return (
    <>
      {open && (
        <div className="fixed  w-[250px] border-r-[1px] h-full border-gray-400">
          <div className="p-3 flex justify-center">
            <h1 className="font-semibold">StudyBuddy</h1>
          </div>
          <hr></hr>
          <div className="p-4">
            <ul>
              <li
                className={
                  "cursor-pointer flex justify-between p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-200"
                }
              >
                <Link href={'chat'}>
                    Chat
                </Link>
              </li>
              <li
                className={
                  "cursor-pointer flex justify-between p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-200"
                }
              >
                <Link href={''}>
                    Resources
                </Link>
              </li>
              <li
                className={
                  "cursor-pointer flex justify-between p-2 rounded-md"
                }
              >
                <DropDown parent="Scheduler" dropLinks={dropLinks}>

                </DropDown>
              </li>
              <li
                className={
                  "cursor-pointer flex justify-between p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-200"
                }
              >
                <Link href={'/achievements'}>
                    Achievements
                </Link>
              </li>
            </ul>
          </div>
          <hr></hr>
        </div>
      )}
    </>
  );
};

export default SideBar;
