"use client";
import { useEffect, useState } from "react";

import io from "socket.io-client";
import { Socket } from "socket.io-client";


export function useSocket() {
  const [socket, setSocket] = useState<typeof Socket | null>(null)

  useEffect(() => {
    const path = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const socketIo = io(path);

    setSocket(socketIo)

    function cleanup() {
      socketIo.disconnect()
    }
    return cleanup
  }, [])

  return socket
}
