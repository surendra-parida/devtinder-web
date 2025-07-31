import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user.user);

  useEffect(() => {
    if (location.pathname === "/login") return;
    if (!userData) {
      dispatch(fetchUserProfile())
        .unwrap()
        .catch((err) => {
          if (err === "Unauthorized") {
            navigate("/login");
          }
        });
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
