"use client";

import { useAuthContext } from "@/context/AuthContext";
import React from "react";

const Footer = () => {
  const { user, userId } = useAuthContext();
  // console.log(todos)
  return (
    <footer className="w-full py-2 px-4 border-t ">
      <span>{`Login by ${user?.email}`}</span>
    </footer>
  );
};

export default Footer;
