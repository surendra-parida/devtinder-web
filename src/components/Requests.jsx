import { useDispatch, useSelector } from "react-redux";
import Heading from "./reusableComponents/Heading";
import { useEffect } from "react";
import { fetchReceivedRequests } from "../utils/requestSlice";
import Header from "./reusableComponents/Header";
import ProfileCard from "./reusableComponents/ProfileCard";
import { reviewRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const { requests, status, error } = useSelector((state) => state.requests);

  useEffect(() => {
    dispatch(fetchReceivedRequests());
  }, [dispatch]);

  return (
    <div className="w-6/12 mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <Heading heading="REQUESTS" />
      <Header
        status={status}
        error={error}
        length={requests?.length || 0}
        message="No Requests found."
      />
      {status === "succeeded" && (
        <div className="space-y-6">
          {requests.map((req) => (
            <ProfileCard
              key={req._id}
              user={req.fromUserId}
              primaryLabel="Accept"
              secondaryLabel="Reject"
              onPrimaryAction={() =>
                dispatch(
                  reviewRequest({ status: "accepted", requestId: req._id })
                )
              }
              onSecondaryAction={() =>
                dispatch(
                  reviewRequest({ status: "rejected", requestId: req._id })
                )
              }
              showActions={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;
