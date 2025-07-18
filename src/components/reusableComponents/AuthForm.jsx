import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function AuthForm({
  isLogin,
  onSubmit,
  serverError,
  toggleMode,
}) {
  const validationSchema = Yup.object().shape({
    firstName: isLogin
      ? Yup.string()
      : Yup.string().required("First name is required").min(2),
    lastName: isLogin
      ? Yup.string()
      : Yup.string().required("Last name is required").min(2),
    emailId: Yup.string()
      .required("Email is required")
      .email("Must be a valid email"),
    password: Yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const submitHandler = (data) => {
    onSubmit(data, reset);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} noValidate>
      {!isLogin && (
        <>
          <input
            type="text"
            placeholder="First Name"
            {...register("firstName")}
            className="input input-bordered w-full mb-2"
          />
          <p className="text-sm text-red-500 mb-2">
            {errors.firstName?.message}
          </p>

          <input
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
            className="input input-bordered w-full mb-2"
          />
          <p className="text-sm text-red-500 mb-2">
            {errors.lastName?.message}
          </p>
        </>
      )}

      <input
        type="email"
        placeholder="Email"
        {...register("emailId")}
        className="input input-bordered w-full mb-2"
      />
      <p className="text-sm text-red-500 mb-2">{errors.emailId?.message}</p>

      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        className="input input-bordered w-full mb-2"
      />
      <p className="text-sm text-red-500 mb-2">{errors.password?.message}</p>

      {serverError && (
        <p className="text-sm text-red-500 mb-2">{serverError}</p>
      )}

      <button type="submit" className="btn btn-primary w-full mt-2">
        {isLogin ? "Login" : "Sign Up"}
      </button>

      <p className="text-center mt-4 text-sm">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={toggleMode}
          className="text-blue-600 underline"
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </form>
  );
}
