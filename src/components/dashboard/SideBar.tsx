"use client";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Menu,
  MenuIcon,
} from "lucide-react";
import Link from "next/link";
import DropDown from "./DropDown";
import { Button } from "../ui/button";
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
              <li>
                <Link
                  className="cursor-pointer flex justify-between p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-200"
                  href={"chat"}
                >
                  Chat
                </Link>
              </li>
              <li>
                <Link
                  className="cursor-pointer flex justify-between p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-200"
                  href={"/timeline"}
                >
                  Scheduler
                </Link>
              </li>
              <li>
                <Link
                  className="cursor-pointer flex justify-between p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-200"
                  href={"/achievements"}
                >
                  Achievements
                </Link>
              </li>
            </ul>
          </div>
          <hr></hr>
          <Button
            className="block fixed bottom-5 left-5"
            size={"lg"}
            onClick={() => signOut()}
          >
            Logout
          </Button>
        </div>
      )}
    </>
  );
};

export default SideBar;
