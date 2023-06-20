import { io } from "socket.io-client";
const socket = io("http://localhost:4000");

export function connect() {
  socket.emit("connect");
}

export function createChat(chatId: string, userId: string, users: string[]) {
  socket.emit("create_room", { chatId, userId, users });
}

export function joinChat(chatId: string, userId: string) {
  socket.emit("join_room", { chatId, userId });
}

export function sendMessage(chatId: string, userId: string, message: string) {
  socket.emit("send_message", { chatId, userId, message });
}

export function recieveMessage() {
  socket.on("recieve_message", (data) => {
    console.log(data);
    return data;
  });
}

export function leftChat(chatId: string, userId: string) {
  socket.emit("left_room", { chatId, userId });
}
