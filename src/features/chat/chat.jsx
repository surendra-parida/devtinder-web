import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user.user);
  const userId = user?._id;
  const firstName = user?.firstName;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!userId) return;
    let socket = createSocketConnection();
    socket.emit("joinChat", { firstName, userId, targetUserId });

    socket.on("messageRecieved", ({ firstName, text }) => {
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!input.trim()) return;
    let socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName,
      userId,
      targetUserId,
      text: input,
    });
    setInput("");
  };

  return (
    <div className="flex justify-center p-6">
      <div className="flex flex-col bg-base-200 p-4 rounded-lg shadow-lg w-[500px] h-[550px]">
        <div className="flex-1 overflow-y-auto mb-4 p-3 bg-base-100 rounded-lg shadow-inner">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat ${
                msg.firstName === firstName ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-header">{msg.firstName}</div>
              <div className="chat-bubble">{msg.text}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="btn btn-primary" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
