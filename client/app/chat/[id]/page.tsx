"use client";
import { Chat, ChatList, DefaultNavbar } from "@/components";
import { Navbar } from "flowbite-react";
import { useState } from "react";
import { createContext } from "react";

export const chatContext = createContext("")

export default function page({params}: {params:{id: string}}) {
  
  const id = params.id;
  const [chatid, setChatid] = useState(id);

  return (
    <chatContext.Provider value={chatid}>
    <div className="flex flex-col w-screen h-screen overflow-x-hidden">
      <DefaultNavbar />
      <div className="flex h-9/10 w-full">
        <ChatList />
        <Chat />
      </div>
    </div>
    </chatContext.Provider>
  );
}
