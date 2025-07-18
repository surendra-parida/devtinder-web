import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/userSlice";

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
    <div className="navbar bg-base-300 shadow-sm sticky top-0 z-50 px-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl flex items-center gap-2">
          <img
            src="./public/devtinder-icon.svg"
            alt="DevTinder logo"
            className="h-10 w-10"
          />
          <span className="hidden sm:inline">DevTinder</span>
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-2 sm:gap-4 flex-col sm:flex-row text-sm sm:text-base">
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
              <div className="w-10 rounded-full">
                <img
                  alt="user photo"
                  src={user.photoUrl}
                  className="rounded-full object-cover border-2 border-indigo-500 cursor-pointer hover:opacity-80 transition"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-40 p-2 shadow"
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
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
