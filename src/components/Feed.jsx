import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed, removeFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";
import Header from "./reusableComponents/Header";
import Pagination from "./Pagination";
import Heading from "./reusableComponents/Heading";

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
      {/* <h2 className="text-3xl font-bold text-center text-gray-400 mb-10">
        FEED
      </h2> */}
      <Heading heading="FEED" />

      <Header
        status={status}
        error={error}
        length={feed?.length || 0}
        message="No profiles found."
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
