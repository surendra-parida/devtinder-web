import { motion } from "framer-motion";

export default function Skeleton({ count = 2 }) {
  return (
    <div className="grid gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-base-300 shadow-md border border-base-400 rounded-xl p-6 animate-pulse"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="w-24 h-24 rounded-full bg-gray-300" />

          <div className="flex-1 w-full space-y-2">
            <div className="h-5 w-1/3 bg-gray-300 rounded" />
            <div className="h-4 w-1/2 bg-gray-300 rounded" />
            <div className="h-4 w-3/4 bg-gray-300 rounded" />
            <div className="h-4 w-1/4 bg-gray-300 rounded" />
            <div className="flex flex-wrap gap-2 mt-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <span
                  key={i}
                  className="h-6 w-16 bg-gray-300 rounded-full"
                ></span>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <div className="h-8 w-24 bg-gray-300 rounded-md" />
              <div className="h-8 w-24 bg-gray-300 rounded-md" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
