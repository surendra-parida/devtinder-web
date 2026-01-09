import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed, sendInterestRequest } from "../../utils/feedSlice";
import Heading from "../../components/Heading";
import StatusBlock from "../../components/StatusBlock";
import ProfileCardStack from "./ProfileCardStack";
import ActionButtons from "./ActionButtons";

export default function Feed() {
  const dispatch = useDispatch();
  const cardRef = useRef(null);

  const [page] = useState(1);
  const limit = 100;

  const { feed, status, error } = useSelector((state) => state.feed);
  const { user } = useSelector((state) => state.user);

  const users = feed?.users || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (user) {
      dispatch(fetchFeed({ page, limit }));
    }
  }, [dispatch, page, limit, user]);

  const handleSwipe = (direction, userId) => {
    const swipeStatus = direction === "right" ? "interested" : "ignored";
    dispatch(sendInterestRequest({ userId, status: swipeStatus }));
    setCurrentIndex((prev) => prev + 1);
  };

  const handleButtonSwipe = (direction) => {
    if (!cardRef.current) return;
    direction === "right"
      ? cardRef.current.swipeRight()
      : cardRef.current.swipeLeft();
  };

  const currentUser = users[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto mt-5 px-4 sm:px-6 lg:px-8">
      <Heading heading="DISCOVER PEOPLE" />
      <div className="w-full text-center">
        <StatusBlock
          status={status}
          error={error}
          length={users.length - currentIndex}
          message="No more profiles to swipe"
        />
      </div>

      {status === "succeeded" && users.length > currentIndex && (
        <ProfileCardStack
          ref={cardRef}
          users={users.slice(currentIndex)}
          onSwipe={handleSwipe}
        />
      )}

      {status === "succeeded" && currentUser && (
        <ActionButtons currentUser={currentUser} onSwipe={handleButtonSwipe} />
      )}
    </div>
  );
}
