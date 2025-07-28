import { motion } from "framer-motion";
import NoData from "./NoData";
import Skeleton from "./Skeleton";

export default function StatusBlock({ status, error, length, message }) {
  if (status === "loading") {
    return <Skeleton count={5} />;
  }

  if (status === "failed") {
    return (
      <motion.p
        className="text-center text-red-500 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Failed Please Try again!
      </motion.p>
    );
  }

  if (status === "succeeded" && length === 0) {
    return <NoData message={message} />;
  }

  return null;
}
