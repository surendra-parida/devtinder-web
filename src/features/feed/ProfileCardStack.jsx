import { motion } from "framer-motion";
import TinderProfileCard from "./TinderProfileCard";

export default function ProfileCardStack({ users, onSwipe }) {
  return (
    <motion.div
      className="flex flex-col items-center w-full max-w-md mx-auto px-4 "
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="relative w-full h-[60vh] min-h-[400px] mt-0">
        {users
          .map((user, index) => (
            <TinderProfileCard
              key={user._id}
              user={user}
              isFront={index === 0}
              onSwipe={onSwipe}
            />
          ))
          .reverse()}
      </div>
    </motion.div>
  );
}
