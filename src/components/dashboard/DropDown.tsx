"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  parent: string;
  dropLinks: string[];
};

export default function DropDown({ parent, dropLinks }: Props) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  return (
    <>
      <div className="w-full ">
        <div className="flex justify-between rounded-md p-1 text-gray-600 hover:text-black hover:bg-gray-200 " onClick={handleClick}>
          <div className="block">{parent}</div>
          <div>{open ? <ChevronUp></ChevronUp> : <ChevronDown />}</div>
        </div>
        {open && (
          <ul className=" mx-2">
            {dropLinks.map((link, index) => {
              return (
                <li
                  key={index}
                  className="cursor-pointer flex justify-between p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-200"
                  
                >
                    <Link href={""}>
                        {link}
                    </Link>
                </li>
              );
            })}
          </ul>
        )}
       
      </div>
    </>
  );
}
