import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket";
import axiosInstance from "../../utils/axiosInstance";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user.user);
  const userId = user?._id;
  const socketRef = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchChatMessages = async () => {
    const chat = await axiosInstance.get("/chat/" + targetUserId);
    console.log(chat.data.messages);
    const chatMessages = chat?.data?.messages.map((msg) => {
      return {
        senderId: msg.senderId._id,
        text: msg.text,
      };
    });
    setMessages(chatMessages);
  };
  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;
    socketRef.current = createSocketConnection();
    socketRef.current.emit("joinChat", { targetUserId });
    socketRef.current.on("messageRecieved", ({ senderId, text }) => {
      setMessages((prev) => [...prev, { senderId, text }]);
    });

    return () => {
      socketRef.current.off("messageRecieved");
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId]);
  console.log(messages);

  const sendMessage = () => {
    if (!input.trim()) return;

    socketRef.current.emit("sendMessage", {
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
                msg.senderId === userId ? "chat-end" : "chat-start"
              }`}
            >
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
