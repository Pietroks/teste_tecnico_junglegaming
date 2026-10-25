import { useEffect, useState, useCallback } from 'react'
import { socket } from '../services/socket'

export interface RealtimeMessage {
  id: string
  user: string
  text: string
  timestamp: string
}

export function useSocket() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [messages, setMessages] = useState<RealtimeMessage[]>([])

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    function onMessage(data: RealtimeMessage) {
      setMessages((prev) => [...prev, data])
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('message', onMessage)

    // Conectar se ainda não estiver conectado
    if (!socket.connected) {
      socket.connect()
    }

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('message', onMessage)
    }
  }, [])

  const sendMessage = useCallback((text: string, user: string = 'Você') => {
    const newMsg: RealtimeMessage = {
      id: String(Date.now()),
      user,
      text,
      timestamp: new Date().toLocaleTimeString(),
    }

    // Se conectado via socket real, emite o evento
    if (socket.connected) {
      socket.emit('sendMessage', { text, user })
    }

    // Adiciona localmente para feedback imediato e demonstração
    setMessages((prev) => [...prev, newMsg])
  }, [])

  return {
    isConnected,
    messages,
    sendMessage,
    connect: () => socket.connect(),
    disconnect: () => socket.disconnect(),
  }
}
