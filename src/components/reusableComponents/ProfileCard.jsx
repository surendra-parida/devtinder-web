// components/reusableComponents/ProfileCard.jsx
export default function ProfileCard({
  user,
  onPrimaryAction,
  onSecondaryAction,
  primaryLabel,
  secondaryLabel,
  showActions = true,
}) {
  const {
    _id,
    firstName,
    lastName,
    about,
    photoUrl,
    skills,
    age,
    gender,
    emailId,
  } = user;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-base-300 shadow-md hover:shadow-lg border border-base-400 rounded-xl p-6 transition duration-200">
      <img
        src={photoUrl}
        alt={`${firstName} ${lastName}`}
        className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
      />
      <div className="flex-1 w-full">
        <h2 className="text-2xl font-bold text-gray-400">
          {firstName} {lastName}
        </h2>
        {emailId && <p className="text-gray-400 text-sm">{emailId}</p>}
        {about && <p className="text-gray-400 text-sm mt-1">{about}</p>}

        {(age || gender) && (
          <p className="text-gray-400 text-sm mt-1">
            {age && (
              <>
                <strong>Age:</strong> {age}
              </>
            )}
            {age && gender && <span>&nbsp;|&nbsp;</span>}
            {gender && (
              <>
                <strong>Gender:</strong> {gender}
              </>
            )}
          </p>
        )}

        {Array.isArray(skills) && skills.length > 0 && (
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

        {showActions && (primaryLabel || secondaryLabel) && (
          <div className="flex gap-3 mt-5 justify-end">
            {primaryLabel && (
              <button
                onClick={() => onPrimaryAction?.(_id)}
                className="bg-indigo-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-indigo-700 transition"
              >
                {primaryLabel}
              </button>
            )}
            {secondaryLabel && (
              <button
                onClick={() => onSecondaryAction?.(_id)}
                className="border border-gray-300 text-gray-400 px-4 py-1.5 rounded-md text-sm hover:bg-gray-100 transition"
              >
                {secondaryLabel}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
