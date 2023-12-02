"use client";

import { doc, getDoc, updateDoc,deleteDoc } from "firebase/firestore";

import React, { FormEvent, useEffect, useState } from "react";
import { db } from "../../../../firebase";
import { Todo } from "@/app/page";
import { useRouter } from "next/navigation";

const detailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [idData, setIdData] = useState<Todo | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [editingTitle, setEditingTitle] = useState<string>("");
  const [editingContent, setEditingContent] = useState<string>("");
  const [detailStatus, setDetailStatus] = useState<string>("");
  

  useEffect(() => {
    const idDataFetch = async () => {
      const docRef = doc(db, "todos", params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setIdData(docSnap.data() as Todo);
        setEditingTitle(docSnap.data().title);
        setEditingContent(docSnap.data().content);
        setDetailStatus(docSnap.data().status)
      } else return;
    };
    idDataFetch();
  }, [params.id]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateRef = doc(db, "todos", params.id);
    await updateDoc(updateRef, {
      title: editingTitle,
      content: editingContent,
      status: detailStatus,
    });
    setEditing(false);
    router.push("/");
    router.refresh();
  };

  const deleteTodo = async (id: string) => {
    if (!id) {
      console.error('ID is undefined');
      return;
    }
    const deleteRef = doc(db, "todos", id);
    try {
      await deleteDoc(deleteRef);
      router.push('/')
      router.refresh();
    } catch (error) {
      console.error('Failed to delete document:', error);
    }
  };

  return (
    <div className="flex max-w-3xl mx-auto px-10 py-10 relative h-screen">
      <form onSubmit={submitHandler}>
        <div className="flex-grow">
          {editing ? (
            <div className="mx-auto mt-10 mb-10 shadow-lg ">
              <label className="text-xl block font-bold mb-3 ">
                タイトル修正
              </label>
              <input
                type="text"
                value={editingTitle}
                className="shadow appearance-none w-full text-3xl font-bold py-2 px-3 text-slate-700 rounded-lg focus:outline-none focus:shadow-outline opacity-70"
                onChange={(e) => setEditingTitle(e.target.value)}
              />
            </div>
          ) : (
            <h1 className="text-4xl text-center mb-10 mt-10">
              {idData?.title}
            </h1>
          )}

          {editing ? (
            <div className="text-lg text-justify mx-auto">
              <label className="text-md block font-bold mb-2 ">備考修正</label>
              <textarea
                value={editingContent}
                className="h-60 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline opacity-70"
                onChange={(e) => setEditingContent(e.target.value)}
              />
            </div>
          ) : (
            <div className="text-lg leading-relaxed text-justify max-w-[70%] mx-auto">
              {idData?.content}
            </div>
          )}
          {editing ? (
            <div className="mt-4 px-4 py-2 flex flex-row  justify-start items-center">
              <label className="text-slate-100 text-lg font-semibold">
                状況 :
              </label>
              <select 
              value={detailStatus} // Added this line
              className="bg-slate-400 ml-2 rounded-md text-md font-semibold px-7 py-3"
              onChange={(e) => setDetailStatus(e.target.value)}
              >
                <option value="未着手">未着手</option>
                <option value="着手">着手</option>
                <option value="完了">完了</option>
              </select>
            </div>
          ) : (
            <div className="flex items-center mx-auto justify-start  max-w-[70%] mt-10 gap-x-4">
              <label className="text-md font-semibold ">状況:</label>
              <p className="text-xl font-bold ">{idData?.status}</p>
            </div>
          )}

          {editing ? (
            <div className="flex justify-end mb-4">
              <button
                type="submit"
                className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 duration-400"
              >
                更新
              </button>
            </div>
          ) : (
            <div className="mt-8 flex justify-end gap-x-2">
              <button
                type="button"
                className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 duration-400"
                onClick={(e) => {
                  e.preventDefault();
                  setEditing(true);
                }}
              >
                編集
              </button>
              <button 
              className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 duration-400"
                onClick={() => deleteTodo(params.id)}
              >
                削除
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default detailPage;
