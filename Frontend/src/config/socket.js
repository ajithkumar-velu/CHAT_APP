import { io } from 'socket.io-client'

// const socket = io("http://localhost:3000", {
//     autoConnect: false,  // Optional: Connect manually
//     withCredentials: true,  // If using cookies
//     reconnectionAttempts: 5,  // Number of retries
//     reconnectionDelay: 1000,  // Time between retries
// })

const socket = io('http://localhost:3000', {
    reconnectionDelay: 1000,
	reconnection: true,
	reconnectionAttempts: 10,
	transports: ["websocket"],
	agent: false,
	upgrade: false,
	rejectUnauthorized: false,
});
export default socket