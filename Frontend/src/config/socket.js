import { io } from 'socket.io-client'

const socket = io(import.meta.env.BACKEND_URL, { 

    reconnectionDelay: 1000,
	reconnection: true,
	reconnectionAttempts: 10,
	transports: ["websocket"],
	agent: false,
	upgrade: false,
	rejectUnauthorized: false,
});
export default socket