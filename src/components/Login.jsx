import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser } from "../utils/userSlice";
import AuthForm from "./reusableComponents/AuthForm";

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
      <div className="card bg-base-300 shadow-md w-full max-w-md">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-semibold mb-4">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
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
      </div>
    </div>
  );
}
