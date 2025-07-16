import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConnections } from "../utils/connsctionsSlice";
import Header from "./reusableComponents/Header";
import Heading from "./reusableComponents/Heading";

const Connections = () => {
  const dispatch = useDispatch();

  const { connections, status, error } = useSelector(
    (state) => state.connections
  );

  useEffect(() => {
    dispatch(fetchConnections());
  }, [dispatch]);

  const handleSendRequest = () => {
    alert("Message Sent!");
  };

  //   const handleIgnore = () => {
  //     alert("Ignored!");
  //   };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Heading heading="Connections" />
      <Header
        status={status}
        error={error}
        length={connections?.length || 0}
        message="No connection found."
      />

      {status === "succeeded" && (
        <div className="space-y-6">
          {connections.map((user, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row bg-base-300 shadow-md hover:shadow-lg border border-base-400 rounded-xl overflow-hidden transition duration-200"
            >
              <figure className="w-full sm:w-48 h-48 flex-shrink-0">
                <img
                  src={user.photoUrl}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="object-cover w-full h-full"
                />
              </figure>

              <div className="flex flex-col justify-between p-5 w-full">
                <div>
                  <h3 className="text-xl font-semibold text-base-400">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">{user.about}</p>

                  {(user.age || user.gender) && (
                    <p className="text-sm text-gray-400 mt-2">
                      {user.age && (
                        <span>
                          <strong>Age:</strong> {user.age}
                        </span>
                      )}
                      {user.age && user.gender && (
                        <span className="mx-2">|</span>
                      )}
                      {user.gender && (
                        <span>
                          <strong>Gender:</strong> {user.gender}
                        </span>
                      )}
                    </p>
                  )}

                  {user.skills?.length > 0 && (
                    <ul className="flex flex-wrap gap-2 mt-3">
                      {user.skills.map((skill, skillIdx) => (
                        <li
                          key={skillIdx}
                          className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex justify-end gap-3 mt-5">
                  <button
                    onClick={handleSendRequest}
                    className="bg-indigo-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-indigo-700 transition"
                  >
                    Send Message
                  </button>
                  {/* <button
                    onClick={handleIgnore}
                    className="border border-gray-300 text-gray-400 px-4 py-1.5 rounded-md text-sm hover:bg-gray-100 transition"
                  >
                    Ignore
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Connections;
