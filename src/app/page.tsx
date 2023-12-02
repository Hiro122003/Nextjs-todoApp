import Image from "next/image";

import SortTodo from "./components/SortTodo";
import TodoList from "./components/TodoList";
import { useTodoContext } from "@/context/TodoContext";

export default function Home() {
  // const {todos} = useTodoContext();
  
  // console.log(todos)

  return (
    <main className="min-h-screen mt-10 ">
      <SortTodo />

      <div className="md:gap-6 md:grid md:grid-cols-2 md:grid-auto-rows-[1fr]">
        <TodoList />
      </div>
    </main>
  );
}
