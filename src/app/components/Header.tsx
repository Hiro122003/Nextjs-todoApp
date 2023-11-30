"use client";

import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useTodoContext } from "@/context/TodoContext";

const Header = () => {
  const { userId,todos } = useTodoContext();
  console.log(todos) 
  

  const pathName = usePathname();
  //   console.log(pathName); //=>/todo/register

  const router = useRouter();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        alert("ログアウトしました。");
        router.push("/auth/login");
      })
      .catch((error) => {
        console.log({ message: error.message });
      });
  };

  if (pathName === "/auth/register" || pathName === "/auth/login") {
    return null;
  }
  return (
    <header className="w-full border-b py-4 px-10  flex flex-col sm:flex sm:flex-row justify-between items-center sm:bg-red-800 md:bg-orange-500 lg:bg-blue-800 xl:bg-green-800 ">
      <div className="relative">
        <h1 className="text-2xl sm:text-3xl font-bold md:text-4xl">
          Todo Application 
        </h1>
      </div>
      <div className="m-4">
        <nav className="gap-8 ">
          <Link
            href="/todo/new"
            className="bg-orange-500 px-2 py-1.5 text-xl lg:text-2xl xl:text-3xl md:px-6 md:py-4 rounded-md lg:px-12 xl:px-20 hover:bg-orange-600 duration-300"
          >
            Creating a New List
          </Link>
          <button
            className="absolute right-3 mt-2 bg-blue-500 px-2 py-1.5 md:px-4 md:py-4 rounded-md hover:bg-blue-600 duration-300 ml-3 sm:ml-5 md:ml-10 ld:ml-15 xl:ml-20 hover:scale-95 text-sm sm:static sm:right-auto"
            onClick={() => handleLogOut()}
          >
            SignOut
          </button>
        </nav>
      </div>
      
    </header>
  );
};

export default Header;
