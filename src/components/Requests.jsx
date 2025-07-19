import { useDispatch, useSelector } from "react-redux";
import Heading from "./Heading";
import { useEffect } from "react";
import { fetchReceivedRequests } from "../utils/requestSlice";
import Header from "./Header";
import ProfileCard from "./ProfileCard";
import { reviewRequest } from "../utils/requestSlice";
import { motion } from "framer-motion";

const Requests = () => {
  const dispatch = useDispatch();
  const { requests, status, error } = useSelector((state) => state.requests);

  useEffect(() => {
    dispatch(fetchReceivedRequests());
  }, [dispatch]);

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 pb-32"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
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
    </motion.div>
  );
};

export default Requests;
