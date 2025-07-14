import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed, removeFeed } from "../utils/feedSlice";

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

  const handleRemoveFeed = () => dispatch(removeFeed());

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleSendRequest = (id) => {
    console.log("Send Request to:", id);
  };

  const handleIgnore = (id) => {
    console.log("Ignore:", id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-400 mb-10">
        Explore Talents
      </h2>

      {/* Loading / Error / Empty State */}
      {status === "loading" && (
        <p className="text-center text-blue-500 font-medium">Loading...</p>
      )}
      {status === "failed" && (
        <p className="text-center text-red-500 font-medium">{error}</p>
      )}
      {status === "succeeded" && feed.length === 0 && (
        <p className="text-center text-gray-400 font-medium">
          No profiles found.
        </p>
      )}

      {/* Feed Cards */}
      <div className="grid gap-6">
        {feed?.map(
          ({
            _id,
            firstName,
            lastName,
            about,
            photoUrl,
            skills,
            age,
            gender,
          }) => (
            <div
              key={_id}
              className="flex flex-col sm:flex-row bg-base-300 shadow-md hover:shadow-lg border border-base-400 rounded-xl overflow-hidden transition duration-200"
            >
              <figure className="w-full sm:w-48 h-48 flex-shrink-0">
                <img
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                  className="object-cover w-full h-full"
                />
              </figure>

              <div className="flex flex-col justify-between p-5 w-full">
                <div>
                  <h3 className="text-xl font-semibold text-base-400">
                    {firstName} {lastName}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">{about}</p>
                  {(age || gender) && (
                    <p className="text-sm text-gray-400 mt-2">
                      {age && (
                        <span>
                          <strong>Age:</strong> {age}
                        </span>
                      )}
                      {age && gender && <span className="mx-2">|</span>}
                      {gender && (
                        <span>
                          <strong>Gender:</strong> {gender}
                        </span>
                      )}
                    </p>
                  )}

                  {/* Skills */}
                  {skills?.length > 0 && (
                    <ul className="flex flex-wrap gap-2 mt-3">
                      {skills.map((skill, idx) => (
                        <li
                          key={idx}
                          className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-5">
                  <button
                    onClick={() => handleSendRequest(_id)}
                    className="bg-indigo-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-indigo-700 transition"
                  >
                    Send Request
                  </button>
                  <button
                    onClick={() => handleIgnore(_id)}
                    className="border border-gray-300 text-gray-400 px-4 py-1.5 rounded-md text-sm hover:bg-gray-100 transition"
                  >
                    Ignore
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12">
        <div className="flex gap-3">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              page === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              page === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Next
          </button>
        </div>

        <button
          onClick={handleRemoveFeed}
          className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition"
        >
          Clear Feed
        </button>
      </div>

      <p className="text-center text-sm text-gray-400 mt-6 mb-20">
        Page <strong>{page}</strong> of <strong>{totalPages}</strong>
      </p>
    </div>
  );
}
