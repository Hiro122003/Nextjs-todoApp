"use client";

import { User } from "firebase/auth/cordova";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import {
  Timestamp,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

// export type Todo = {
//     id: string;
//     title: string;
//     content: string;
//     status: string;
//     createdAt: Timestamp;
//   };

type TodoProviderProps = {
  children: ReactNode;
};

type TodoContextType = {
  user: User | null;
  userId: string | null;
  // todos:Todo[];
};

const defaultData = {
  user: null,
  userId: null,
  // todos:[],
};

const TodoContext = createContext<TodoContextType>(defaultData);

export function TodoProvider({ children }: TodoProviderProps) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  // const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      setUser(newUser);
      setUserId(newUser ? newUser.uid : null);
      // console.log(userId)

      if (user) {
        router.push("/");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // ファイアベースからすべてのデータの読み込み
  // useEffect(() => {
  //   const fetchDate = async() => {
  //     const todosDataRef = collection(db, "todos");
  //     const q = query(todosDataRef, orderBy("createdAt", "desc")); //新しい順にデータの表示

  //     const unsbscribe = onSnapshot(q, (snapshot) => {
  //       const data = snapshot.docs.map((doc) => ({
  //         id: doc.data().id,
  //         title: doc.data().title,
  //         content: doc.data().content,
  //         status: doc.data().status,
  //         createdAt: doc.data().createdAt,
  //       }));
  //       setTodos(data);
  //     });
  //     return () => {
  //       unsbscribe();
  //     };
  //   };
  //   fetchDate();
  // }, []);

  // useEffect(() => {
  //   console.log(`context内のtodos:  ${todos}`);
  // }, [todos]);

  // プロバイダーに渡す初期値
  const value = {
    user,
    userId,
    // todos,
  };

  return <TodoContext.Provider value={value}>
    {children}
    </TodoContext.Provider>;
}

export const useTodoContext = () => {
  return useContext(TodoContext);
};
