export default function EditProfileModal({
  editedUser,
  onChange,
  onSave,
  onCancel,
}) {
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({
          target: {
            name: "photoUrl",
            value: reader.result,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <h3 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Edit Your Profile
        </h3>

        <div className="flex justify-center mb-4 relative">
          <label htmlFor="photoUpload">
            <img
              src={editedUser.photoUrl}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-2 border-indigo-500 cursor-pointer hover:opacity-80 transition"
              title="Click to change photo"
            />
          </label>
          <input
            id="photoUpload"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>

        <div className="form-control mb-2">
          <label className="label">First Name</label>
          <input
            name="firstName"
            type="text"
            value={editedUser.firstName}
            onChange={onChange}
            className="input input-bordered"
          />
        </div>

        <div className="form-control mb-2">
          <label className="label">Last Name</label>
          <input
            name="lastName"
            type="text"
            value={editedUser.lastName}
            onChange={onChange}
            className="input input-bordered"
          />
        </div>

        <div className="form-control mb-2">
          <label className="label">Email</label>
          <input
            name="emailId"
            type="email"
            defaultValue={editedUser.emailId}
            disabled={true}
            className="input input-bordered"
          />
        </div>

        <div className="form-control mb-2">
          <label className="label">Age</label>
          <input
            name="age"
            type="number"
            value={editedUser.age}
            onChange={onChange}
            className="input input-bordered"
          />
        </div>

        <div className="form-control mb-2">
          <label className="label">Gender</label>
          <select
            name="gender"
            value={editedUser.gender}
            onChange={onChange}
            className="select select-bordered"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Other</option>
          </select>
        </div>

        <div className="form-control mb-2">
          <label className="label">Skills</label>
          <input
            name="skills"
            type="text"
            value={editedUser.skills?.join(", ") || ""}
            onChange={(e) =>
              onChange({
                target: {
                  name: "skills",
                  value: e.target.value.split(",").map((skill) => skill.trim()),
                },
              })
            }
            className="input input-bordered"
          />
        </div>

        <div className="form-control mb-2">
          <label className="label">About</label>
          <textarea
            name="about"
            value={editedUser.about}
            onChange={onChange}
            className="textarea textarea-bordered"
          />
        </div>

        <div className="modal-action">
          <button onClick={onSave} className="btn btn-primary">
            Save Profile
          </button>
          <button onClick={onCancel} className="btn">
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
}
