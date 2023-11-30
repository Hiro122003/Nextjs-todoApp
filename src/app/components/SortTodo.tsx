import { useTodoContext } from "@/context/TodoContext";
import React from "react";

const SortTodo = () => {
  // const {userId} = useTodoContext()
  return (
    <div>
      <div className="mb-10 flex justify-evenly">
        <button className="bg-green-500 px-4 py-2 rounded-xl text-white">
          タスク状況 :
          <select className="bg-green-500 ml-2 rounded-md text-md font-semibold">
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
  );
};

export default SortTodo;
