"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTodoContext } from "@/context/TodoContext";
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
  const router = useRouter();

  // const { userId,todos } = useTodoContext(); //Error: (0 , _hooks__WEBPACK_IMPORTED_MODULE_3__.useTodoData) is not a function

  // const {todos} = useTodoData() //Error: (0 , _hooks__WEBPACK_IMPORTED_MODULE_3__.useTodoData) is not a function
  // console.log(todos)

  const deleteTodo = async (id: string) => {
    const deleteRef = doc(db, "todos", id);
    await deleteDoc(deleteRef);
    router.refresh;
  };

  return (
    <div className="bg-slate-100 text-gray-700 rounded-md shadow-xl p-4 md:h-50 custom-box mb-4 md:mb-0 flex flex-col">
      <h2 className="text-xl font-extrabold mb-2">
        <Link href={`/todo/${todo.id}`}>{todo.title}</Link>
      </h2>
      <div className="flex-grow">
      <small className="text-sm font-semibold">
        {todo.content.length > 70
          ? todo.content.substring(0, 70) + "..."
          : todo.content}
      </small>
      {todo.content.length > 70 ?(
        <Link href={`/todo/${todo.id}`} className="text-sm">
        続きを読む
      </Link>
      ):('')}
      </div>
      
      
      <div className="flex justify-between mt-2">
        <p className="text-sm font-semibold">{`状況：${todo.status}`}</p>
      </div>
      <div className="flex justify-end gap-1.5 items-center relative">
        <small className="inline-block absolute left-0">
          {`投稿日：${todo.createdAt.toDate().toLocaleDateString()}`}
        </small>
        <Link href={`/todo/${todo.id}`}>
          <button className="bg-blue-500 px-2 py-1 rounded-md text-gray-100">
            詳細
          </button>
        </Link>

        <button
          type="button"
          className="bg-red-500 px-2 py-1 rounded-md text-gray-100"
          onClick={() => deleteTodo(todo.id)}
        >
          削除
        </button>
      </div>
    </div>
  );
};

export default TodoList;
