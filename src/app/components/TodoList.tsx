import React from 'react'
import Link from "next/link";
import { useTodoContext } from '@/context/TodoContext';

const TodoList = () => {
    // const { userId,todos } = useTodoContext();

  return (
    <div className="bg-slate-100 text-gray-700 rounded-md shadow-xl p-4 md:h-50 custom-box mb-4 md:mb-0">
          <h2 className="text-xl font-extrabold mb-2">
            <Link href="#">lorem</Link>
          </h2>
          <small className="text-sm font-semibold">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo
            necessitatibus tempora ut blanditiis totam cum minus voluptate non
            eligendi autem?...
          </small>
          <Link href="#" className="text-sm">
            続きを読む
          </Link>
          <div className="flex justify-between mt-2">
            <p className="text-sm font-semibold">状況：未着手</p>
          </div>
          <div className="flex justify-end gap-1.5 items-center relative">
            <small className="inline-block absolute left-0">
              投稿日：2023/11/30
            </small>
            <button className="bg-blue-500 px-2 py-1 rounded-md text-gray-100">
              編集
            </button>
            <button className="bg-red-500 px-2 py-1 rounded-md text-gray-100">
              削除
            </button>
          </div>
        </div>
  )
}

export default TodoList