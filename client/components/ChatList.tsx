import { getAllUserChat } from "@/api/chat";
import { IChat } from "@/interfaces/Ichat";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";

export default function ChatList() {
  const [chat, setChat] = useState([]);

  useEffect(() => {
    let userId:string = "647d3366593f446fca07bbca"
    getAllUserChat(userId).then((res:any)=>{
      console.log(res)
      setChat(res.data)
    })
  },[]);

  return (
    <div className="h-full w-1/6 flex flex-col p-0 overflow-x-hidden px-0 py-2 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
      <span className="font-semibold text-sm  sm:text-md  md:text-lg  lg:text-xl px-2 pt-6 self-center">
        Group list
      </span>
      <div className="flex flex-col h-full overflow-y-scroll scrollbar-thin">
        {
          chat?.map((group:IChat)=>{
            return(
              /*<ChatListItem status="Online" groupName="aymen ben omrane" />*/
              <ChatListItem status="Online" groupName={group.chatName} />
            )
          })
        }
      </div>
    </div>
  );
}
