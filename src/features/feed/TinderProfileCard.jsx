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
          transition: { type: "spring", stiffness: 300, damping: 20 },
        })
        .then(() => onSwipe(direction, _id));
    } else {
      controls.start({ x: 0, rotate: 0, scale: 1, opacity: 1 });
    }
  };

  useEffect(() => {
    controls.set({
      scale: isFront ? 1 : 0.95,
      opacity: isFront ? 1 : 0.75,
      y: isFront ? 0 : 14,
    });
  }, [isFront]);

  return (
    <motion.div
      initial={{ scale: 0.96, opacity: 0 }}
      animate={controls}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      style={{ x, rotate: isFront ? x.get() / 30 : 0 }}
      onDragEnd={handleDragEnd}
      className={`absolute top-0 w-full h-full rounded-2xl overflow-hidden
        bg-black border border-white/10 shadow-2xl
        ${isFront ? "z-10" : "z-0"}
      `}
    >
      <div className="relative w-full h-2/3">
        <img
          src={photoUrl || "/default-user.jpg"}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-5 left-5 text-white">
          <h2 className="text-2xl font-semibold">
            {firstName} {lastName}
            {age && <span className="ml-2 text-lg text-white/70">• {age}</span>}
          </h2>
          {gender && (
            <p className="text-sm text-white/60 capitalize">{gender}</p>
          )}
        </div>
      </div>

      <div className="h-1/3 px-4 py-5 bg-neutral-900 flex flex-col justify-between gap-3">
        {about && (
          <p className="text-sm text-neutral-300 text-center line-clamp-3">
            {about}
          </p>
        )}

        {Array.isArray(skills) && skills.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-2">
            {skills.map((skill, idx) => (
              <li
                key={idx}
                className="px-3 py-1 rounded-full text-xs font-medium
                  bg-indigo-600/15 text-indigo-300
                  border border-indigo-500/25"
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
