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

  const handleRemoveFeed = () => {
    dispatch(removeFeed());
  };

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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-400">
        Feed
      </h2>

      {status === "loading" && (
        <p className="text-center text-blue-500 font-medium">Loading...</p>
      )}
      {status === "failed" && (
        <p className="text-center text-red-500 font-medium">{error}</p>
      )}
      {status === "succeeded" && feed.length === 0 && (
        <p className="text-center text-gray-500 font-medium">No data found</p>
      )}

      <div className="grid gap-6">
        {feed &&
          feed.map(
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
                className="card card-side bg-base-100 shadow-sm border border-gray-200"
              >
                <figure className="w-40 h-40 sm:w-48 sm:h-48 flex-shrink-0">
                  <img
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                    className="object-cover w-full h-full"
                  />
                </figure>
                <div className="card-body flex flex-col justify-between p-4 sm:p-6">
                  <div>
                    <h2 className="card-title text-lg font-semibold text-gray-500">
                      {firstName} {lastName}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">{about}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      <p className="text-sm text-gray-500 mt-1">
                        {age && (
                          <>
                            <strong>Age:</strong> {age}
                          </>
                        )}
                        {age && gender && <span className="mx-2">|</span>}
                        {gender && (
                          <>
                            <strong>Gender:</strong> {gender}
                          </>
                        )}
                      </p>
                    </p>
                    {skills?.length > 0 && (
                      <ul className="flex flex-wrap gap-2 mt-3">
                        {skills.map((skill, idx) => (
                          <li
                            key={idx}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="card-actions justify-end mt-4 gap-3">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleSendRequest(_id)}
                    >
                      Send Request
                    </button>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => handleIgnore(_id)}
                    >
                      Ignore
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
      </div>

      <div className="flex justify-between items-center mt-10 flex-wrap gap-4">
        <div className="flex gap-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className={`btn ${page === 1 ? "btn-disabled" : "btn-outline"}`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className={`btn ${
              page === totalPages ? "btn-disabled" : "btn-outline"
            }`}
          >
            Next
          </button>
        </div>
        <button onClick={handleRemoveFeed} className="btn btn-error text-white">
          Clear Feed
        </button>
      </div>

      <p className="text-center mt-4 text-gray-500 mb-20">
        Page <strong>{page}</strong> of <strong>{totalPages}</strong>
      </p>
    </div>
  );
}
