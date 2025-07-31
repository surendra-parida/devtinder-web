import { motion, useMotionValue, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function TinderProfileCard({ user, isFront, onSwipe }) {
  const { _id, firstName, lastName, about, photoUrl, skills, age, gender } =
    user;

  const x = useMotionValue(0);
  const controls = useAnimation();

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(offset) > 100 || Math.abs(velocity) > 500) {
      const direction = offset > 0 ? "right" : "left";
      controls
        .start({
          x: direction === "right" ? 1000 : -1000,
          rotate: direction === "right" ? 25 : -25,
          scale: 1.05,
          opacity: 0,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
          },
        })
        .then(() => onSwipe(direction, _id));
    } else {
      controls.start({ x: 0, rotate: 0, scale: 1, opacity: 1 });
    }
  };

  useEffect(() => {
    controls.set({ opacity: 1 });
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={controls}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      style={{ x, rotate: x.get() / 30 }}
      onDragEnd={handleDragEnd}
      className={`absolute w-full h-full top-0 bg-gray-300 rounded-2xl overflow-hidden shadow-md flex flex-col transition-all duration-300 ${
        isFront ? "z-10" : "z-0"
      }`}
    >
      <div className="relative w-full h-2/3 bg-gray-100">
        <img
          src={photoUrl || "/default-user.jpg"}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 text-white drop-shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold">
            {firstName} {lastName}
            {age && (
              <span className="ml-2 text-lg sm:text-xl font-medium">
                • {age}
              </span>
            )}
          </h2>
          {gender && (
            <p className="text-sm text-gray-300 capitalize">{gender}</p>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between h-1/3 space-y-3">
        {about && (
          <p className="text-gray-700 text-sm text-center line-clamp-3">
            {about}
          </p>
        )}

        {Array.isArray(skills) && skills.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-2">
            {skills.map((skill, idx) => (
              <li
                key={idx}
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {skill}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
