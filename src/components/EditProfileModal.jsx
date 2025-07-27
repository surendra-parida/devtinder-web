import { useForm } from "react-hook-form";
import { useState } from "react";
import { motion } from "framer-motion";

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
  const [photoFile, setPhotoFile] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("age", data.age);
    formData.append("gender", data.gender);
    formData.append("about", data.about);

    formData.append("skills", JSON.stringify(skills));

    if (photoFile) {
      formData.append("photo", photoFile);
    }

    onSave(formData);
  };

  return (
    <dialog open className="modal">
      <motion.div
        className="modal-box w-[90%] max-w-sm p-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <h3 className="text-xl font-semibold text-center text-indigo-600 mb-4">
          Edit Profile
        </h3>

        <div className="flex justify-center mb-3 relative">
          <label htmlFor="photoUpload">
            <motion.img
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              src={photoUrl}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500 cursor-pointer transition"
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-sm">
          <div className="form-control">
            <label className="label text-xs">First Name</label>
            <input
              type="text"
              className="input input-sm input-bordered"
              {...register("firstName", { required: true, minLength: 4 })}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                First name must be at least 4 characters
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label text-xs">Last Name</label>
            <input
              type="text"
              className="input input-sm input-bordered"
              {...register("lastName", { required: true, minLength: 4 })}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                Last name must be at least 4 characters
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label text-xs">Email</label>
            <input
              type="email"
              disabled
              className="input input-sm input-bordered"
              {...register("emailId")}
            />
          </div>

          <div className="form-control">
            <label className="label text-xs">Age</label>
            <input
              type="number"
              className="input input-sm input-bordered"
              {...register("age", { required: true })}
            />
            {errors.age && (
              <p className="text-red-500 text-xs mt-1">Age is required</p>
            )}
          </div>

          <div className="form-control">
            <label className="label text-xs">Gender</label>
            <select
              className="select select-sm select-bordered"
              {...register("gender", {
                required: "Please select a valid gender",
                validate: (value) =>
                  ["male", "female", "others"].includes(value) ||
                  "Please select a valid gender",
              })}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label text-xs">Skills</label>
            <div className="flex flex-wrap gap-1 mb-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium"
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
              className="input input-sm input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label text-xs">About</label>
            <textarea
              rows={3}
              className="textarea textarea-sm textarea-bordered"
              {...register("about")}
            />
          </div>

          <div className="modal-action flex justify-end gap-2 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-sm btn-primary"
              type="submit"
            >
              Save
            </motion.button>
            <button type="button" onClick={onCancel} className="btn btn-sm">
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </dialog>
  );
}
