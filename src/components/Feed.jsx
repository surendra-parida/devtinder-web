import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed, removeFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";
import FeedHeader from "./FeedHeader";
import Pagination from "./Pagination";

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
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-400 mb-10">
        Explore Talents
      </h2>

      <FeedHeader
        status={status}
        error={error}
        feedLength={feed?.length || 0}
      />

      <div className="grid gap-6">
        {feed?.map((user) => (
          <FeedCard key={user._id} user={user} />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => page > 1 && setPage(page - 1)}
        onNext={() => page < totalPages && setPage(page + 1)}
        onClear={() => dispatch(removeFeed())}
      />
    </div>
  );
}
