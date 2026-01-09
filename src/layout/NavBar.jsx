import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/userSlice";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (err) {
      console.log("Logout failed", err);
    }
  };

  return (
    <motion.div
      className="navbar bg-base-300 shadow-sm sticky top-0 z-50 px-4"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex-1">
        <Link
          to={user?._id && !user.error ? "/feed" : "/login"}
          className="btn btn-ghost text-xl flex items-center gap-2"
        >
          <motion.img
            src="/devtinder-icon.svg"
            alt="DevTinder logo"
            className="h-10 w-10"
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <span className="hidden sm:inline">DevTinder</span>
        </Link>
      </div>

      {user?._id && !user.error ? (
        <motion.div
          className="flex items-center gap-2 sm:gap-4 flex-col sm:flex-row text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="hidden sm:block">
            Welcome Back{" "}
            <span className="font-semibold">
              {user.firstName?.charAt(0).toUpperCase() +
                user.firstName?.slice(1)}
            </span>
          </h3>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <motion.div
                className="w-10 rounded-full"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.img
                  alt="user photo"
                  src={user.photoUrl}
                  className="rounded-full object-cover border-2 border-indigo-500 cursor-pointer hover:opacity-80 transition"
                />
              </motion.div>
            </div>

            <AnimatePresence>
              <motion.ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-40 p-2 shadow"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li>
                  <motion.a onClick={handleLogout} whileTap={{ scale: 0.95 }}>
                    Logout
                  </motion.a>
                </li>
              </motion.ul>
            </AnimatePresence>
          </div>
        </motion.div>
      ) : null}
    </motion.div>
  );
};

export default NavBar;
