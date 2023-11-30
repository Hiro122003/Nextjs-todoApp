// "use client";

// import { User } from "firebase/auth/cordova";
// import { useRouter } from "next/navigation";
// import {
//   ReactNode,
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { auth, db } from "../../firebase";
// import {
//   Timestamp,
//   collection,
//   doc,
//   onSnapshot,
//   orderBy,
//   query,
// } from "firebase/firestore";

// export type Todo = {
//   id: string;
//   title: string;
//   content: string;
//   status: string;
//   createdAt: Timestamp;
// };

// type TodoProviderProps = {
//   children: ReactNode;
// };

// type TodoFunctionProps = {
//   todos: Todo[];
// };

// const defalutFunction = {
//   todos: [],
// };

// const TodoFunction = createContext<TodoFunctionProps>(defalutFunction);

// export function FunctionProvider({ children }: TodoProviderProps) {
//   const [todos, setTodos] = useState<Todo[]>([]);

//   // ファイアベースからすべてのデータの読み込み
//   useEffect(() => {
//     const fetchDate = async () => {
//       const todosDataRef = collection(db, "todos");
//       const q = query(todosDataRef, orderBy("createdAt", "desc")); //新しい順にデータの表示

//       const unsbscribe = onSnapshot(q, (snapshot) => {
//         const data = snapshot.docs.map((doc) => ({
//           id: doc.data().id,
//           title: doc.data().title,
//           content: doc.data().content,
//           status: doc.data().status,
//           createdAt: doc.data().createdAt,
//         }));
//         setTodos(data);
//       });
//       return () => {
//         unsbscribe();
//       };
//     };
//     fetchDate();
//   }, []);

// //   useEffect(() => {
// //     console.log(todos);
// //   }, [todos]);


//   const value = {
//     todos,
// }
// return <TodoFunction.Provider value={value}>{children}</TodoFunction.Provider>;

// }

// export function useFunctionContext() {
//     return useContext(TodoFunction);
//   }
  

