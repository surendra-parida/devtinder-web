import { motion } from "framer-motion";
import TinderProfileCard from "./TinderProfileCard";
import { forwardRef } from "react";

const ProfileCardStack = forwardRef(({ users, onSwipe }, ref) => {
  return (
    <motion.div
      className="flex flex-col items-center w-full max-w-md mx-auto px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="relative w-full h-[60vh] min-h-[400px]">
        {users
          .map((user, index) => (
            <TinderProfileCard
              key={user._id}
              ref={index === 0 ? ref : null}
              user={user}
              isFront={index === 0}
              onSwipe={onSwipe}
            />
          ))
          .reverse()}
      </div>
    </motion.div>
  );
});

ProfileCardStack.displayName = "ProfileCardStack";

export default ProfileCardStack;
