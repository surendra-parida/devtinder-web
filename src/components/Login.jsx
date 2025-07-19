import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser } from "../utils/userSlice";
import AuthForm from "./AuthForm";
import { motion } from "framer-motion";

export default function LoginCard() {
  const [isLogin, setIsLogin] = useState(true);
  const [serverError, setServerError] = useState("");
  const [redirectNow, setRedirectNow] = useState(false);
  const user = useSelector((store) => store.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && redirectNow) {
      navigate("/", { replace: true });
    }
  }, [user, navigate, redirectNow]);

  const handleSubmit = async (data, reset) => {
    setServerError("");
    try {
      const resultAction = isLogin
        ? await dispatch(loginUser(data))
        : await dispatch(signupUser(data));

      if (
        (isLogin && loginUser.fulfilled.match(resultAction)) ||
        (!isLogin && signupUser.fulfilled.match(resultAction))
      ) {
        if (isLogin) {
          setRedirectNow(true);
        } else {
          reset();
          setIsLogin(true);
        }
      } else {
        setServerError(resultAction.payload || "Authentication failed.");
      }
    } catch {
      setServerError("Request failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="card bg-base-300 shadow-md w-full max-w-md"
      >
        <div className="card-body">
          <motion.h2
            key={isLogin ? "login-title" : "signup-title"}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="card-title justify-center text-2xl font-semibold mb-4"
          >
            {isLogin ? "Login" : "Sign Up"}
          </motion.h2>
          <AuthForm
            isLogin={isLogin}
            onSubmit={handleSubmit}
            serverError={serverError}
            toggleMode={() => {
              setIsLogin(!isLogin);
              setServerError("");
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
