import { useEffect, useRef, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { createSocketConnection } from "../../utils/socket";
import axiosInstance from "../../utils/axiosInstance";
import { formatMessageTime } from "../../utils/date";

const Chat = () => {
  const { targetUserId } = useParams();
  const { state } = useLocation();

  const targetUserName = `${state?.firstName} ${state?.lastName}`;
  const user = useSelector((store) => store.user.user);
  const userId = user?._id;

  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState(null);

  useEffect(() => {
    const fetchChatMessages = async () => {
      const { data } = await axiosInstance.get(`/chat/${targetUserId}`);
      setMessages(
        data.messages.map((msg) => ({
          senderId: msg.senderId._id,
          text: msg.text,
          createdAt: msg.createdAt,
          seen: msg.seen,
        }))
      );
    };
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", { targetUserId });

    socket.on("messageRecieved", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("userStatus", ({ userId: id, isOnline, lastSeen }) => {
      if (id === targetUserId) {
        setIsOnline(isOnline);
        if (lastSeen) setLastSeen(lastSeen);
      }
    });

    socket.on("onlineUsers", (users) => {
      setIsOnline(users.includes(targetUserId));
    });

    socket.on("messageSeen", () => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.senderId === userId ? { ...msg, seen: true } : msg
        )
      );
    });

    return () => socket.disconnect();
  }, [userId, targetUserId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(() => {
    if (!input.trim()) return;

    socketRef.current.emit("sendMessage", {
      targetUserId,
      text: input,
    });

    setInput("");
  }, [input, targetUserId]);

  return (
    <div className="flex justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col bg-base-200 p-4 rounded-xl w-[500px] h-[550px] shadow-lg"
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.span
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.6, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.4,
            }}
            className={`w-3 h-3 rounded-full ${
              isOnline ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <div>
            <p className="font-semibold">{targetUserName}</p>
            {!isOnline && lastSeen && (
              <p className="text-xs text-gray-500">
                Last seen {formatMessageTime(lastSeen)}
              </p>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          <AnimatePresence>
            {messages.map((msg, i) => {
              const isOwn = msg.senderId === userId;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isOwn ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`chat ${isOwn ? "chat-end" : "chat-start"}`}
                >
                  <div
                    className={`flex flex-col ${
                      isOwn ? "items-end" : "items-start"
                    }`}
                  >
                    <p className="text-xs text-gray-400 mb-1">
                      {formatMessageTime(msg.createdAt)}
                    </p>

                    <div className="chat-bubble flex items-end gap-1 max-w-xs">
                      <span>{msg.text}</span>
                      {isOwn && (
                        <span className="text-xs">{msg.seen ? "✔✔" : "✔"}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        <div className="flex gap-2 mt-3">
          <input
            type="text"
            placeholder="Type a message..."
            className="input input-bordered w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="btn btn-primary"
            onClick={sendMessage}
          >
            Send
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Chat;
