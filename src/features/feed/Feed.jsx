import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed, sendInterestRequest } from "../../utils/feedSlice";
import Heading from "../../components/Heading";
import StatusBlock from "../../components/StatusBlock";
import ProfileCardStack from "./ProfileCardStack";
import ActionButtons from "./ActionButtons";

export default function Feed() {
  const dispatch = useDispatch();
  const [page] = useState(1);
  const limit = 100;

  const { feed, status, error } = useSelector((state) => state.feed);
  const users = feed?.users || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchFeed({ page, limit }));
  }, [dispatch, page, limit]);

  const handleSwipe = (direction, userId) => {
    const swipeStatus = direction === "right" ? "interested" : "ignored";
    dispatch(sendInterestRequest({ userId, status: swipeStatus }));
    setCurrentIndex((prev) => prev + 1);
  };

  const currentUser = users[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto mt-5 px-4 sm:px-6 lg:px-8">
      <Heading heading="DISCOVER PEOPLE" />
      <div className="w-full text-center ">
        <StatusBlock
          status={status}
          error={error}
          length={users.length - currentIndex}
          message="No more profiles to swipe"
        />
      </div>
      <ProfileCardStack
        users={users.slice(currentIndex)}
        onSwipe={handleSwipe}
      />
      <ActionButtons currentUser={currentUser} onSwipe={handleSwipe} />
    </div>
  );
}
