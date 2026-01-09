import { motion } from "framer-motion";
import { AlertTriangle, Inbox } from "lucide-react";
import Skeleton from "./Skeleton";

export default function StatusBlock({ status, length, message }) {
  if (status === "loading") {
    return (
      <div className="bg-base-900/40 rounded-xl p-6">
        <Skeleton count={5} />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-5 text-red-400"
      >
        <AlertTriangle size={20} />
        <p className="text-sm font-medium">
          Something went wrong. Please try again.
        </p>
      </motion.div>
    );
  }

  if (status === "succeeded" && length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center gap-2 bg-base-900/40 border border-base-700 rounded-xl p-8 text-base-content/60"
      >
        <Inbox size={28} />
        <p className="text-sm font-medium">{message || "No data available"}</p>
      </motion.div>
    );
  }

  return null;
}
