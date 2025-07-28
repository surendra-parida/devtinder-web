import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import EditProfileModal from "./EditProfileModal";
import ProfileCard from "../../components/ProfileCard";
import { updateUser } from "../../utils/userSlice";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "../../components/Heading";

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

  const handleEditClick = () => {
    setEditedUser({ ...user });
    setModalOpen(true);
  };

  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-500">
        You are not logged in.
      </div>
    );
  }

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 pb-32"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Heading heading="PROFILE" />
      <ProfileCard
        user={user}
        onPrimaryAction={handleEditClick}
        primaryLabel="Edit Profile"
        showActions={true}
      />

      <AnimatePresence>
        {modalOpen && (
          <EditProfileModal
            editedUser={editedUser}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
