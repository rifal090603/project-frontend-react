import { io } from "socket.io-client";

const socket = io("wss://coffee-macth.shop/", {
  path: "/socket.io",
  transports: ["websocket"],
  secure: true,
}); 
socket.on('connect', () => console.log("Socket connected:", socket.id));
socket.on('connect_error', (err) => console.error("Socket connect error:", err));
export default socket;
