import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { TodoProvider } from "@/context/TodoContext";

export const metadata: Metadata = {
  title: "Todo Application",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <TodoProvider>
    <html lang="ja">
      <body className="container mx-auto bg-slate-700 text-slate-100">
        <div className="flex flex-col">
          <TodoProvider>
            <Header />
            {children}
            <Footer />
          </TodoProvider>
        </div>
      </body>
    </html>
    // </TodoProvider>
  );
}
