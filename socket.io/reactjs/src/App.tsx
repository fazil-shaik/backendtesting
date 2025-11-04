// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:3000"); // connect to Node server

// function App() {
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState<{ text: string; id: string }[]>([]);

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("Connected to server:", socket.id);
//     });

//     socket.on("receive_message", (data) => {
//       setChat((prev) => [...prev, data]);
//     });

//     return () => {
//       socket.off("receive_message");
//     };
//   }, []);

//   const sendMessage = () => {
//     socket.emit("send_message", { text: message, id: socket.id });
//     setMessage("");
//   };

//   return (
//     <div style={{ padding: 40 }}>
//       <h2>💬 Real-Time Chat (Socket.IO + React)</h2>
//       <div style={{ border: "1px solid gray", padding: 10, height: 200, overflowY: "scroll" }}>
//         {chat.map((msg, index) => (
//           <p key={index}>
//             <b>{msg.id === socket.id ? "You" : msg.id}</b>: {msg.text}
//           </p>
//         ))}
//       </div>

//       <input
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type message..."
//         style={{ marginRight: 10 }}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// }

// export default App;


import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

type RoomMessage = {
  sender: string;
  message: string;
};

function App() {
  // state declarations
  const [room, setRoom] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<RoomMessage[]>([]);
  const [joined, setJoined] = useState<boolean>(false);

  // register a single listener for incoming room messages
  useEffect(() => {
    const handler = (data: RoomMessage) => {
      setChat((prev: RoomMessage[]) => [...prev, data]);
    };
    socket.on("receive_room_message", handler);
    return () => {
      socket.off("receive_room_message", handler);
    };
  }, []);

  const joinRoom = () => {
    if (room.trim()) {
      socket.emit("join_room", room);
      setJoined(true);
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send_room_message", {
        room,
        message,
        sender: socket.id,
      });
      setMessage("");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>💬 Socket.IO Room Chat</h2>

      {!joined ? (
        <>
          <input
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Enter room name..."
          />
          <button onClick={joinRoom}>Join Room</button>
        </>
      ) : (
        <>
          <h3>Room: {room}</h3>
          <div
            style={{
              border: "1px solid gray",
              padding: 10,
              height: 200,
              overflowY: "scroll",
            }}
          >
            {chat.map((msg, index) => (
              <p key={index}>
                <b>{msg.sender === socket.id ? "You" : msg.sender}</b>:{" "}
                {msg.message}
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
        </>
      )}
    </div>
  );
}

export default App;
