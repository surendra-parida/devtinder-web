import { motion } from "framer-motion";

const NoData = ({ message = "No data found", height = "h-64" }) => {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center ${height} bg-gray-50 rounded-md text-gray-500 border border-dashed`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.svg
        className="w-12 h-12 mb-2 text-gray-400"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.75v14.5M19.25 12H4.75"
        />
      </motion.svg>
      <motion.p
        className="text-base font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {message}
      </motion.p>
    </motion.div>
  );
};

export default NoData;
