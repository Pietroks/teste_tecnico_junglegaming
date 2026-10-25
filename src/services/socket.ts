import { io, Socket } from 'socket.io-client'

export interface ServerToClientEvents {
  message: (data: { id: string; user: string; text: string; timestamp: string }) => void
  notification: (data: { id: string; title: string; message: string; type: 'info' | 'success' | 'warning' }) => void
}

export interface ClientToServerEvents {
  sendMessage: (data: { text: string; user: string }) => void
}

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001'

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
})
