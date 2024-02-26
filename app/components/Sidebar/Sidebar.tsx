"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { IoCheckmark } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import { UserButton, useClerk, useUser } from "@clerk/nextjs";
import { FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const { user } = useUser();
  const { firstName, imageUrl } = user || { firstName: "", imageUrl: "" };
  const { signOut } = useClerk();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.refresh();
    }, 2000);
  }, [router]);

  return (
    <div className="card-wrapper">
      <div className="card w-100 bg-base-100 shadow-xl min-h-[80vh]">
        <div className="card-body ">
          <div className="pro-wrap flex flex-col justify-between min-h-[90vh]">
            {/* Profile */}
            <div className="profile ">
              <div className="avatar flex gap-2 justify-center relative items-center">
                <Image
                  className="rounded-full object-cover pro-image"
                  src={imageUrl}
                  width={40}
                  height={40}
                  alt="profile"
                />
                <UserButton />
                <h4 className="text-2xl">{firstName}</h4>
              </div>
            </div>
            {/* content */}
            <div className="content mt-5 flex justify-center menu-wrap">
              <ul className="flex flex-col items-baseline">
                <li className="flex gap-2 justify-center items-center  font-semibold mb-4 ml-0">
                  <FaHome />
                  <Link href="/">All Task</Link>
                </li>
                <li className="flex gap-2 justify-center items-center font-semibold mb-4">
                  <CiBoxList />
                  <Link href="/important">Important</Link>
                </li>
                <li className="flex gap-2 juscentify-center items-center font-semibold mb-4">
                  <IoCheckmark />
                  <Link href="/completed">Completed</Link>
                </li>
                <li className="flex gap-2 juscentify-center items-center font-semibold mb-4">
                  <IoIosDocument />
                  <Link href="/doitnow">Do It Now</Link>
                </li>
              </ul>
            </div>
            <button
              className="flex gap-2 justify-center items-center text-2xl font-bold"
              onClick={() => signOut(() => router.push("/"))}
            >
              <FaSignOutAlt />
              Signout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
