import { useForm } from "react-hook-form";
import { useState } from "react";
import { motion } from "framer-motion";
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

  const isUnchanged = (data) => {
    return (
      data.firstName === editedUser.firstName &&
      data.lastName === editedUser.lastName &&
      data.age === editedUser.age &&
      data.gender === editedUser.gender &&
      data.about === editedUser.about &&
      JSON.stringify(skills) === JSON.stringify(editedUser.skills || []) &&
      !photoFile
    );
  };

  const onSubmit = (data) => {
    if (isUnchanged(data)) {
      toast.info("No changes made to profile.");
      return;
    }

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
    <dialog
      open
      className="modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}
    >
      <motion.div
        className="modal-box w-[90%] max-w-sm p-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <h3 className="text-xl font-semibold text-center text-indigo-600 mb-3">
          Edit Profile
        </h3>

        <div className="flex justify-center mb-1 relative">
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-xs">
          <div className="form-control">
            <label className="label mb-0.5 text-xs font-medium">
              First Name
            </label>
            <input
              type="text"
              className="input input-bordered input-xs text-xs h-8"
              {...register("firstName", { required: true, minLength: 4 })}
            />
            {errors.firstName && (
              <p className="text-red-500 text-[11px] mt-0.5">
                First name must be at least 4 characters
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label mb-0.5 text-xs font-medium">
              Last Name
            </label>
            <input
              type="text"
              className="input input-bordered input-xs text-xs h-8"
              {...register("lastName", { required: true, minLength: 4 })}
            />
            {errors.lastName && (
              <p className="text-red-500 text-[11px] mt-0.5">
                Last name must be at least 4 characters
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label mb-0.5 text-xs font-medium">Email</label>
            <input
              type="email"
              disabled
              className="input input-bordered input-xs text-xs h-8 bg-gray-100 cursor-not-allowed"
              {...register("emailId")}
            />
          </div>

          <div className="form-control">
            <label className="label mb-0.5 text-xs font-medium">Age</label>
            <input
              type="number"
              className="input input-bordered input-xs text-xs h-8"
              {...register("age", { required: true })}
            />
            {errors.age && (
              <p className="text-red-500 text-[11px] mt-0.5">Age is required</p>
            )}
          </div>

          <div className="form-control">
            <label className="label mb-0.5 text-xs font-medium">Gender</label>
            <select
              className="select select-bordered select-xs text-xs h-8"
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
              <p className="text-red-500 text-[11px] mt-0.5">
                {errors.gender.message}
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label mb-0.5 text-xs font-medium">Skills</label>
            <div className="flex flex-wrap gap-1 mb-1">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-[11px] font-medium flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() =>
                      setSkills(skills.filter((_, i) => i !== index))
                    }
                    className="ml-1 text-red-500 hover:text-red-700 text-xs"
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
              className="input input-bordered input-xs text-xs h-8"
            />
          </div>

          <div className="form-control">
            <label className="label mb-0.5 text-xs font-medium">About</label>
            <textarea
              rows={2}
              className="textarea textarea-bordered textarea-xs text-xs"
              {...register("about")}
            />
          </div>

          <div className="modal-action flex justify-end gap-2 mt-3">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn btn-xs btn-primary text-xs h-7 px-4"
              type="submit"
            >
              Save
            </motion.button>
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-xs text-xs h-7 px-4"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </dialog>
  );
}
