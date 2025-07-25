import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConnections } from "../utils/connsctionsSlice";
import Header from "./Header";
import Heading from "./Heading";
import ProfileCard from "./ProfileCard";

const Connections = () => {
  const dispatch = useDispatch();

  const { connections, status, error } = useSelector(
    (state) => state.connections
  );

  useEffect(() => {
    dispatch(fetchConnections());
  }, [dispatch]);

  const handleSendRequest = (id) => {
    alert(`Message sent to user ID: ${id}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 pb-32">
      <Heading heading="Connections" />
      <Header
        status={status}
        error={error}
        length={connections?.length || 0}
        message="No connection found."
      />
      {status === "succeeded" && (
        <div className="space-y-6">
          {connections.map((user) => (
            <ProfileCard
              key={user._id}
              user={user}
              primaryLabel="Send Message"
              onPrimaryAction={handleSendRequest}
              showActions={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Connections;
