import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";

export default function EditProfileModal({ editedUser, onSave, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: editedUser.firstName || "",
      lastName: editedUser.lastName || "",
      emailId: editedUser.emailId || "",
      age: editedUser.age || "",
      gender: editedUser.gender || "",
      about: editedUser.about || "",
    },
  });

  const [photoUrl, setPhotoUrl] = useState(editedUser.photoUrl || "");
  const [skills, setSkills] = useState(editedUser.skills || []);
  const [skillInput, setSkillInput] = useState("");

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    const isSame =
      data.firstName === editedUser.firstName &&
      data.lastName === editedUser.lastName &&
      data.emailId === editedUser.emailId &&
      data.age === editedUser.age &&
      data.gender === editedUser.gender &&
      data.about === editedUser.about &&
      photoUrl === (editedUser.photoUrl || "") &&
      JSON.stringify(skills) === JSON.stringify(editedUser.skills || []);

    if (isSame) {
      toast.info("No changes made to the profile.");
      return;
    }

    onSave({
      ...editedUser,
      ...data,
      photoUrl,
      skills,
    });
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
              src={photoUrl}
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control mb-2">
            <label className="label">First Name</label>
            <input
              type="text"
              className="input input-bordered"
              {...register("firstName", { required: true, minLength: 4 })}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                First name must be at least 4 characters
              </p>
            )}
          </div>

          <div className="form-control mb-2">
            <label className="label">Last Name</label>
            <input
              type="text"
              className="input input-bordered"
              {...register("lastName", { required: true, minLength: 4 })}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                Last name must be at least 4 characters
              </p>
            )}
          </div>

          <div className="form-control mb-2">
            <label className="label">Email</label>
            <input
              type="email"
              disabled
              className="input input-bordered"
              {...register("emailId")}
            />
          </div>

          <div className="form-control mb-2">
            <label className="label">Age</label>
            <input
              type="number"
              className="input input-bordered"
              {...register("age", { required: true })}
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">Age is required</p>
            )}
          </div>

          <div className="form-control mb-2">
            <label className="label">Gender</label>
            <select className="select select-bordered" {...register("gender")}>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Other</option>
            </select>
          </div>

          <div className="form-control mb-4">
            <label className="label">Skills</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() =>
                      setSkills(skills.filter((_, i) => i !== index))
                    }
                    className="ml-1 text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === ",") && skillInput.trim()) {
                  e.preventDefault();
                  const newSkill = skillInput.trim();
                  if (!skills.includes(newSkill)) {
                    setSkills([...skills, newSkill]);
                  }
                  setSkillInput("");
                }
              }}
              placeholder="Type skill and press Enter or comma"
              className="input input-bordered"
            />
          </div>

          <div className="form-control mb-2">
            <label className="label">About</label>
            <textarea
              className="textarea textarea-bordered"
              {...register("about")}
            />
          </div>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Save Profile
            </button>
            <button type="button" onClick={onCancel} className="btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
