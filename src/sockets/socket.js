import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // ganti sesuai host backend kamu

export default socket;
