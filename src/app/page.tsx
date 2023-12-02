"use client";

import SortTodo from "./components/SortTodo";
import TodoList from "./components/TodoList";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTodoContext } from "@/context/TodoContext";
import { db } from "../../firebase";

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

export type Todo = {
  id: string;
  title: string;
  content: string;
  status: string;
  createdAt: Timestamp;
};

export default function Home() {
  // const {todos} = useTodoContext;
  // console.log(todos)
  const router = useRouter();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortOption,setSortOption] = useState<string>('すべて')
  const [sortedTodos, setSortedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const todosDataRef = collection(db, "todos");
      const q = query(todosDataRef, orderBy("createdAt", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          status: doc.data().status,
          createdAt: doc.data().createdAt,
        }));
        setTodos(data);
      });
      return () => {
        unsubscribe();
      };
    };
    fetchData();
  }, []);

  useEffect(() => {
    let sorted = [...todos];
    if (sortOption !== "すべて") {
      sorted = sorted.filter((todo) => todo.status === sortOption);
    }
    setSortedTodos(sorted);
  }, [todos, sortOption]);

  const deleteTodo = async (id: string) => {
    const deleteRef = doc(db, "todos", id);
    await deleteDoc(deleteRef);
    router.refresh();
  };

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
          <button className="bg-green-500 px-4 py-2 rounded-xl text-white">
            {" "}
            投稿日順
          </button>
        </div>
      </div>

      <div className="md:gap-6 md:grid md:grid-cols-2 md:grid-auto-rows-[1fr]">
        {sortedTodos.map((todo) => (
          <div key = {todo.id} className="bg-slate-100 text-gray-700 rounded-md shadow-xl p-4 md:h-50 custom-box mb-4 md:mb-0 flex flex-col">
            <h2 className="text-xl font-extrabold mb-2">
              <Link href={`/todo/${todo.id}`}>{todo.title}</Link>
            </h2>
            <div className="flex-grow">
              <small className="text-sm font-semibold">
                {todo.content.length > 70
                  ? todo.content.substring(0, 70) + "..."
                  : todo.content}
              </small>
              {todo.content.length > 70 ? (
                <Link href={`/todo/${todo.id}`} className="text-sm">
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
        ))}
      </div>
    </main>
  );
}
