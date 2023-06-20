"use client";

import { Button, Card, TextInput } from "flowbite-react";
import Message from "./Message";
import { io } from "socket.io-client";
import { useContext, useEffect, useState } from "react";
import { getAllMessages } from "@/api/message";
import { getChat } from "@/api/chat";
import { IChat } from "@/interfaces/Ichat";
import { IMessage } from "@/interfaces/Imessage";
import { chatContext } from "@/app/chat/[id]/page";
const socket = io("http://localhost:4000");

export default function Chat() {

  const chatId = useContext(chatContext);

  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([{} as IMessage]);
  const [chat, setChat] = useState({} as IChat);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      setReceivedMessages((prevMessages: Array<IMessage>) => [
        ...prevMessages,
        message,
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    getChat(chatId).then((res: any) => {
      setChat(res.data);
    })
    getAllMessages("648118884620fbcebcc39a8b").then((res: any) => {
      setReceivedMessages(res.data);
    })

  },[])

  useEffect(() => {
    console.log(chat)
    console.log(receivedMessages)
  },[chat,receivedMessages])


  const handleSendMessage = (message: string) => {
    socket.emit("message", { message });
    setMessage("");
  };

  return (
    <Card className="h-full w-9/10 flex flex-col">
      <Card className="h-1/10">
        <span>{chat?.chatName}</span>
      </Card>
      <Card className="h-8/10">
        <div className="h-full flex flex-col overflow-y-scroll scrollbar-thin">
          {Array.isArray(receivedMessages) &&
            receivedMessages.map((message: IMessage) => {
              return (
                <Message
                  sender={message.sender}
                  chatType="group"
                  style="other"
                  content={message.content}
                />
              );
            })}
        </div>
      </Card>
      <form action="" className="flex justify-center h-1/10">
        <TextInput
          value={message}
          className="mb-2 mr-2 w-full"
          placeholder="Write a message"
          onChange={(e: any) => setMessage(e.target.value)}
        />
        <Button
          className="bg-primary-600 hover:bg-primary-800"
          onClick={() => handleSendMessage(message)}
        >
          Send
        </Button>
      </form>
    </Card>
  );
}
