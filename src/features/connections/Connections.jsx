import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConnections } from "../../utils/connsctionsSlice";
import { useNavigate } from "react-router-dom";
import Heading from "../../components/Heading";
import ProfileCard from "../../components/ProfileCard";
import StatusBlock from "../../components/StatusBlock";

const Connections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { connections, status, error } = useSelector(
    (state) => state.connections
  );

  useEffect(() => {
    dispatch(fetchConnections());
  }, [dispatch]);

  const handleSendMessage = (id, { firstName, lastName }) => {
    console.log(firstName, lastName);
    navigate(`/chat/${id}`, {
      state: { firstName, lastName },
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-5 px-4 sm:px-6 lg:px-8 pb-5">
      <Heading heading="Connections" />
      <StatusBlock
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
              onPrimaryAction={handleSendMessage}
              showActions={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Connections;
