import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed, removeFeed, sendInterestRequest } from "../utils/feedSlice";
import Header from "./Header";
import Pagination from "./Pagination";
import Heading from "./Heading";
import ProfileCard from "./ProfileCard";
import { motion } from "framer-motion";

export default function Feed() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { feed, status, error, totalPages } = useSelector(
    (state) => state.feed
  );

  useEffect(() => {
    dispatch(fetchFeed({ page, limit }));
  }, [dispatch, page]);

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 pb-32"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Heading heading="FEED" />
      <Header
        status={status}
        error={error}
        length={feed?.length || 0}
        message="Empty Feed"
      />

      <div className="grid gap-6">
        {feed?.map((user) => (
          <ProfileCard
            key={user._id}
            user={user}
            primaryLabel="Interested"
            secondaryLabel="Ignore"
            onPrimaryAction={() =>
              dispatch(
                sendInterestRequest({ userId: user._id, status: "interested" })
              )
            }
            onSecondaryAction={() =>
              dispatch(
                sendInterestRequest({ userId: user._id, status: "ignored" })
              )
            }
          />
        ))}
      </div>

      {feed?.length > 10 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPrev={() => page > 1 && setPage(page - 1)}
          onNext={() => page < totalPages && setPage(page + 1)}
          onClear={() => dispatch(removeFeed())}
        />
      )}
    </motion.div>
  );
}
