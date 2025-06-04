import { io } from "socket.io-client";

const socket = io("http://3.106.228.0:8999", {
  transports: ["websocket", "polling"], // pastikan urutannya benar
  withCredentials: true,
});// ganti sesuai host backend kamu

export default socket;
