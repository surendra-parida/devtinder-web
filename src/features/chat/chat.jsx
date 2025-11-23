import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user.user);
  const userId = user._id;
  const firstName = user.firstName;
  console.log(userId, firstName);

  useEffect(() => {
    let socket = createSocketConnection();
    socket.emit("joinChat", { firstName, userId, targetUserId });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
    { text: "Hi! I wanted to know more about your services.", sender: "user" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
    // Simulate bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Got it! I’ll get back to you shortly.", sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <div className="flex justify-center p-6">
      <div className="flex flex-col bg-base-200 p-4 rounded-lg shadow-lg w-[500px] h-[550px]">
        {/* Chat Box */}
        <div className="flex-1 overflow-y-auto mb-4 p-3 bg-base-100 rounded-lg shadow-inner">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat ${
                msg.sender === "user" ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-bubble">{msg.text}</div>
            </div>
          ))}
        </div>

        {/* Input Box */}
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
