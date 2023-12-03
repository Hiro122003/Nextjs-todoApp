"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useAuthContext } from "@/context/AuthContext";
import { useTodoContext } from "@/context/TodoContext";

import DetailsIcon from "@mui/icons-material/Details";
import { Button } from "@mui/material"
import {motion} from "framer-motion";

const Header = () => {
  const { userId } = useAuthContext();
  // console.log(userId)

  const { todos } = useTodoContext();
  // console.log(todos)

  const pathName = usePathname();
  const router = useRouter();
  // console.log(pathName); //=>/todo/register

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
    <header className="w-full border-b py-4 px-10  flex flex-col sm:flex sm:flex-row justify-between items-center">
      <motion.div 
        whileHover={{scale:1.2}}
        whileTap={{scale:1.1}}
        drag = 'x'
        dragConstraints={{ left: -100, right: 100 }}
      className="relative">
        <Link href="/" className="relative group overflow-hidden">
          <h1 className="text-2xl sm:text-3xl font-bold md:text-4xl">
            Todo Application
          </h1>
          <span className="absolute bottom-0 w-full h-[2px] inline-block bg-blue-500 -translate-x-[250%] group-hover:translate-x-0 transition-transform duration-700"></span>
        </Link>
      </motion.div>
      <div className="m-4">
        <nav className="gap-8 flex ">
          {pathName === "/todo/new" ? (
            <div className=" px-3 py-1.5 text-xl lg:text-2xl xl:text-3xl md:px-6 md:py-4 rounded-md lg:px-12 xl:px-20 hover:bg-orange-600 duration-300">
              
            </div>
          ) : (
            <Link
              href="/todo/new"
              className="bg-orange-500 px-3 py-1.5 text-xl lg:text-2xl xl:text-3xl md:px-4 md:py-4 rounded-md lg:px-12 xl:px-20 hover:bg-orange-600 duration-300"
            >
              リスト新規作成
            </Link>
          )}

          <Button
            variant="contained"
            color="success"
            size="small"
            className="absolute right-2 mt-2 bg-blue-500 px-2 py-1.5 md:px-4 md:py-4 rounded-md hover:bg-blue-600 duration-300 ml-3 sm:ml-5 md:ml-10 ld:ml-15 xl:ml-20 hover:scale-95 text-sm sm:static sm:right-auto"
            onClick={() => handleLogOut()}
          >
            ログアウト
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
