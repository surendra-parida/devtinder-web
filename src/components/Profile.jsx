import { useState } from "react";
import { useSelector } from "react-redux";
import EditProfileModal from "./EditProfileModal";
import UserDetailsCard from "./UserDetailsCard";
import { useDispatch } from "react-redux";
import { updateUser } from "../utils/userSlice";

export default function Profile() {
  const user = useSelector((state) => state.user.user);
  const [editedUser, setEditedUser] = useState(user || {});
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSave = async (newUserData) => {
    try {
      await dispatch(updateUser(newUserData)).unwrap();
      setModalOpen(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleCancel = () => {
    setEditedUser({ ...user });
    setModalOpen(false);
  };

  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-500">
        You are not logged in.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-base-300 shadow-md rounded-xl">
      <UserDetailsCard user={user} />

      <div className="mt-6 text-right">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            setEditedUser({ ...user });
            setModalOpen(true);
          }}
        >
          Edit Profile
        </button>
      </div>

      {modalOpen && (
        <EditProfileModal
          editedUser={editedUser}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
