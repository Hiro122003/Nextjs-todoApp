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

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextType = {
  user: User | null;
  userId: string | null;
  // todos:Todo[];
};

const defaultData = {
  user: null,
  userId: null,
  // todos:[],
};

const AuthContext = createContext<AuthContextType>(defaultData);

export function AuthProvider({ children }: AuthProviderProps) {
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


  // プロバイダーに渡す初期値
  const value = {
    user,
    userId,
    // todos,
  };

  return <AuthContext.Provider value={value}>
    {children}
    </AuthContext.Provider>;
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};
