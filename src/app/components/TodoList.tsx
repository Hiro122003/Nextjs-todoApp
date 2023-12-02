"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTodoContext } from "@/context/AuthContext";
import { db } from "../../../firebase";
// import { Todo, useTodoData } from '@/hooks';
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Todo } from "../page";
import { useRouter } from "next/navigation";

type TodoListProps = {
  todo: Todo;
};

const TodoList = ({ todo }: TodoListProps) => {
  // const { userId,todos } = useTodoContext(); //Error: (0 , _hooks__WEBPACK_IMPORTED_MODULE_3__.useTodoData) is not a function

  // const {todos} = useTodoData() //Error: (0 , _hooks__WEBPACK_IMPORTED_MODULE_3__.useTodoData) is not a function
  // console.log(todos)

  return <></>;
};

export default TodoList;
