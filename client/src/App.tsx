import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [latestMessage, setLatestMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = () => {
      console.log('connected');
      setSocket(socket);
    }
    socket.onmessage = (message) => {
      console.log('Received message:', message.data)
      setLatestMessage(message.data);
    }
    return () => {
      socket.close();
    }
  }, []);
 
  if (!socket) {
    return (
      <div>
        Thinking...
      </div>
    )
  }

  return (
    <>
      <input onChange={(e) => setLatestMessage(e.target.value)}></input>
      <button onClick={() => {
        socket.send(latestMessage);
      }}>Send message</button>
      <div>
        {latestMessage}
      </div>
    </>
  )
}

export default App
