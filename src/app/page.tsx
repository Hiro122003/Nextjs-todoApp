"use client";

import SortTodo from "./components/SortTodo";
import TodoList from "./components/TodoList";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { db } from "../../firebase";

import DetailsIcon from "@mui/icons-material/Details";
import DeleteIcon from "@mui/icons-material/DeleteForever";

import {
  Timestamp,
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useTodoContext } from "@/context/TodoContext";
import { Button, ButtonBase } from "@mui/material";
import { motion } from "framer-motion";

export type Todo = {
  id: string;
  title: string;
  content: string;
  status: string;
  createdAt: Timestamp;
};

export default function Home() {
  const { todos } = useTodoContext();
  // console.log(todos)
  const router = useRouter();

  // const [todos, setTodos] = useState<Todo[]>([]);
  const [sortOption, setSortOption] = useState<string>("すべて");
  const [sortedTodos, setSortedTodos] = useState<Todo[]>([]);
  const [isSortedByPostDate,setIsSortedByPostDate] = useState<boolean>(false)

  useEffect(() => {
    let sorted = [...todos];
    if (sortOption !== "すべて") {
      sorted = sorted.filter((todo) => todo.status === sortOption);
    }

    if(isSortedByPostDate){
      sorted.sort((a,b)=>a.createdAt.seconds - b.createdAt.seconds)
    }
    setSortedTodos(sorted);
  }, [todos, sortOption,isSortedByPostDate]);

  const deleteTodo = async (id: string) => {
    try {
      const deleteRef = doc(db, "todos", id);
      await deleteDoc(deleteRef);
      router.refresh();
    } catch (error) {
      console.error("Error deletetodo", error);
    }
  };

  const handlePostOrder = () => {
    setIsSortedByPostDate(prev => !prev)
  }

  return (
    <main className="min-h-screen mt-10 ">
      <div>
        <div className="mb-10 flex justify-evenly">
          <button className="bg-green-500 px-4 py-2 rounded-xl text-white">
            タスク状況 :
            <select
              className="bg-green-500 ml-2 rounded-md text-md font-semibold outline-none"
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="すべて">すべて</option>
              <option value="未着手">未着手</option>
              <option value="着手">着手</option>
              <option value="完了">完了</option>
            </select>
          </button>
          <button 
          className="bg-green-500 px-4 py-2 rounded-xl text-white"
          onClick={handlePostOrder}
          >
            {" "}
            投稿日順
          </button>
        </div>
      </div>

      <div className="md:gap-6 md:grid md:grid-cols-2 md:grid-auto-rows-[1fr]">
        
        {sortedTodos.map((todo) => (
          <motion.div
          initial = {{x:-100,y:200}}
          animate = {{x:0,y:0}}
          transition={{duration:1}}
            key={todo.id}
            className="bg-slate-100 text-gray-700 rounded-md shadow-xl p-4 md:h-50 custom-box mb-4 md:mb-0 flex flex-col"
          >
            <Link
              href={`/todo/${todo.id}`}
              className="relative group overflow-hidden mb-2"
            >
              <h2 className="text-xl font-extrabold  ">{todo.title}</h2>
              <span className="absolute bottom-0 w-[80%] h-[1.5px] inline-block bg-blue-400 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-700"></span>
            </Link>
            <div className="flex-grow">
              <small className="text-sm font-semibold">
                {todo.content.length > 70
                  ? todo.content.substring(0, 70) + "..."
                  : todo.content}
              </small>
              {todo.content.length > 70 ? (
                <Link
                  key={todo.id}
                  href={`/todo/${todo.id}`}
                  className="text-sm"
                >
                  続きを読む
                </Link>
              ) : (
                ""
              )}
            </div>

            <div className="flex justify-between mt-2">
              <p className="text-sm font-semibold">{`状況：${todo.status}`}</p>
            </div>
            <div className="flex justify-end gap-1.5 items-center relative">
              <small className="inline-block absolute left-0">
                {`投稿日：${todo.createdAt.toDate().toLocaleDateString()}`}
              </small>
              <div className="flex items-center">
                <Link href={`/todo/${todo.id}`}>
                  <button className="px-2 py-1 bg-blue-500 rounded-md text-gray-100 flex items-center">
                    <DetailsIcon fontSize="small" />
                    詳細
                  </button>
                </Link>
              </div>

              <Button
                type="button"
                variant="contained"
                color="error"
                size="small"
                startIcon={<DeleteIcon />}
                className="bg-red-500 px-2 py-1 rounded-md text-gray-100 flex items-center"
                onClick={() => deleteTodo(todo.id)}
              >
                削除
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
