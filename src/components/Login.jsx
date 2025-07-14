import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../utils/userSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const user = useSelector((store) => store.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    emailId: Yup.string()
      .required("Email is required")
      .matches(/^[^\s@]+@[^\s@]+\.(com)$/, "Please enter a valid .com email"),
    password: Yup.string()
      .required("Password is required")
      .test("password-rules", "", function (value) {
        const errors = [];
        if (!value || value.length < 8)
          errors.push("Must be at least 8 characters");
        if (!/[A-Z]/.test(value))
          errors.push("Must include one uppercase letter");
        if (!/[a-z]/.test(value))
          errors.push("Must include one lowercase letter");
        if (!/[0-9]/.test(value)) errors.push("Must include one number");
        if (!/[\W_]/.test(value))
          errors.push("Must include one special character");
        return (
          errors.length === 0 ||
          this.createError({ message: errors.join("\n") })
        );
      }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setServerError("");
    try {
      const resultAction = await dispatch(loginUser(data));
      if (loginUser.fulfilled.match(resultAction)) {
        reset();
        navigate("/", { replace: true });
      } else {
        setServerError(resultAction.payload || "Login failed. Try again.");
      }
    } catch (err) {
      setServerError("Login failed. Please try again.");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("emailId")}
                className="input input-bordered w-full"
              />
              {errors.emailId && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.emailId.message}
                </p>
              )}
            </div>
            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="input input-bordered w-full pr-10"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <div className="text-sm text-red-500 mt-1 whitespace-pre-line">
                  {errors.password.message}
                </div>
              )}
            </div>
            <div className="form-control mt-4">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </div>
            {serverError && (
              <p className="text-center text-red-500 text-sm mt-2">
                {serverError}
              </p>
            )}
            <div className="text-center text-sm">
              Don’t have an account?{" "}
              <button
                type="button"
                className="text-primary underline hover:text-primary-focus"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
