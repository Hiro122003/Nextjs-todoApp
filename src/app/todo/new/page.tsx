'use client'

import React from "react";
import { useState } from "react";
import { Timestamp } from "firebase/firestore";

import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../../../firebase";



const CreateNewList = () => {
  const [title,setTitle] = useState<string>('');
  const [content,setContent] = useState<string>('');
  const [status,setStatus] = useState('未完了')
  const [createdAt, setCreatedAt] = useState(Timestamp.fromDate(new Date()))

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const currentDateTime = Timestamp.fromDate(new Date());
    setCreatedAt(currentDateTime)


    try{
      const docRef = await addDoc(collection(db,'todos'),{
        title,
        content,
        status,
        createdAt
      });
      setTitle('');
      setContent('')
      setStatus('未完了')
    }catch(error:any){
      console.error(error.message)
    }
  };


  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-8 mt-4 pl-1">新規登録</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-200 p-10 rounded shadow-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            タイトル
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            備考(詳細があれば書いてください)
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
          ></textarea>
        </div>

        <div className="mt-4 px-4 py-2 flex flex-row items-center justify-evenly border-2 border-slate-400 rounded-xl" >
          <label className="text-slate-700 text-lg font-semibold">状況 :</label>
          <select className="bg-green-400 ml-2 rounded-md text-md font-semibold px-7 py-3">
            <option value="未着手">未完了</option>
            <option value="着手">着手</option>
            <option value="完了">完了</option>
          </select>
        </div>

        <button
          type="submit"
          className="py-2 px-4 border rounded-md bg-orange-500 mt-7"
          // disabled={loading}
        >
          新規作成
        </button>
        {/* {loading ? 
          <div className="inline-block items-center ml-4 animate-spin-slow rounded-full h-5 w-5 border-t-2 border-b-2 border-teal-500"></div> : ''} */}
        
      </form>
    </div>
  );
};

export default CreateNewList;
