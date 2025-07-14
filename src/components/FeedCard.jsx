export default function FeedCard({ user }) {
  const { _id, firstName, lastName, about, photoUrl, skills, age, gender } =
    user;

  const handleSendRequest = () => console.log("Send Request to:", _id);
  const handleIgnore = () => console.log("Ignore:", _id);

  return (
    <div className="flex flex-col sm:flex-row bg-base-300 shadow-md hover:shadow-lg border border-base-400 rounded-xl overflow-hidden transition duration-200">
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

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={handleSendRequest}
            className="bg-indigo-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-indigo-700 transition"
          >
            Send Request
          </button>
          <button
            onClick={handleIgnore}
            className="border border-gray-300 text-gray-400 px-4 py-1.5 rounded-md text-sm hover:bg-gray-100 transition"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
}
