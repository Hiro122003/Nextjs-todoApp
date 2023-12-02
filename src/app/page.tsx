'use client'

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
} from "firebase/firestore";

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

  const [todos, setTodos] = useState<Todo[]>([]);

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

  // useEffect(() => {
  //   console.log(todos);
  // }, [todos]);

  

  return (
    <main className="min-h-screen mt-10 ">
      <SortTodo />

      <div className="md:gap-6 md:grid md:grid-cols-2 md:grid-auto-rows-[1fr]">
        {todos.map((todo) => (
          <TodoList todo = {todo}/>
        ))}
        
      </div>
    </main>
  );
}
