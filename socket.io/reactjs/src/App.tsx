import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // connect to Node server

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ text: string; id: string }[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("send_message", { text: message, id: socket.id });
    setMessage("");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>💬 Real-Time Chat (Socket.IO + React)</h2>
      <div style={{ border: "1px solid gray", padding: 10, height: 200, overflowY: "scroll" }}>
        {chat.map((msg, index) => (
          <p key={index}>
            <b>{msg.id === socket.id ? "You" : msg.id}</b>: {msg.text}
          </p>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
        style={{ marginRight: 10 }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
