export default function UserDetailsCard({ user }) {
  const { photoUrl, firstName, lastName, emailId, about, age, gender, skills } =
    user;
  return (
    <div className="flex items-center gap-6">
      <img
        src={photoUrl}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
      />
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-400">
          {firstName} {lastName}
        </h2>
        <p className="text-gray-400 text-sm">{emailId}</p>
        <p className="text-gray-400 text-sm mt-1">{about}</p>
        <p className="text-gray-400 text-sm mt-1">
          <strong>Age:</strong> {age} &nbsp;|&nbsp;
          <strong>Gender:</strong> {gender}
        </p>

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
      </div>
    </div>
  );
}
