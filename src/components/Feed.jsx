import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed, removeFeed } from "../utils/feedSlice";
import Header from "./reusableComponents/Header";
import Pagination from "./Pagination";
import Heading from "./reusableComponents/Heading";
import ProfileCard from "./reusableComponents/ProfileCard";

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
    <div className="w-6/12 mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <Heading heading="FEED" />
      <Header
        status={status}
        error={error}
        length={feed?.length || 0}
        message="No profiles found."
      />

      <div className="grid gap-6">
        {feed?.map((user) => (
          <ProfileCard
            key={user._id}
            user={user}
            primaryLabel="Accept"
            secondaryLabel="Decline"
            onPrimaryAction={(id) => console.log("Accept", id)}
            onSecondaryAction={(id) => console.log("Decline", id)}
          />
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
