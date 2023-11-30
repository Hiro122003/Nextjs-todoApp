'use client'

import { useTodoContext } from "@/context/TodoContext";
import React from "react";

const Footer = () => {
    const { user,userId } = useTodoContext();
    // console.log(todos)
  return (
    <footer className="w-full py-2 px-4 border-t ">
      <span>{`Login by ${user?.email}`}</span>
    </footer>
  );
};

export default Footer;
