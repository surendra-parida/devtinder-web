import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import PasswordInput from "./PasswordInput";
import InputField from "./InputField";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthForm({
  isLogin,
  onSubmit,
  serverError,
  toggleMode,
}) {
  const validationSchema = Yup.object().shape({
    firstName: isLogin
      ? Yup.string()
      : Yup.string()
          .required("First name is required")
          .min(4, "Minimum 4 characters"),
    lastName: isLogin
      ? Yup.string()
      : Yup.string()
          .required("Last name is required")
          .min(4, "Minimum 4 characters"),
    emailId: Yup.string()
      .required("Email is required")
      .email("Must be a valid email"),
    password: isLogin
      ? Yup.string().required("Password is required")
      : Yup.string()
          .required("Password is required")
          .min(8, "Minimum 8 characters")
          .matches(/[a-z]/, "Must include a lowercase letter")
          .matches(/[A-Z]/, "Must include an uppercase letter")
          .matches(/\d/, "Must include a number")
          .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Must include a special character"
          ),
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
      <AnimatePresence mode="wait">
        {!isLogin && (
          <motion.div
            key="signup-names"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <InputField
              label="First Name"
              name="firstName"
              register={register}
              error={errors.firstName}
            />
            <InputField
              label="Last Name"
              name="lastName"
              register={register}
              error={errors.lastName}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <InputField
        label="Email"
        name="emailId"
        type="email"
        register={register}
        error={errors.emailId}
      />

      <PasswordInput register={register} error={errors.password} />

      {serverError && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-500 mb-2"
        >
          {serverError}
        </motion.p>
      )}

      <motion.button
        type="submit"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="btn btn-primary w-full mt-2"
      >
        {isLogin ? "Login" : "Sign Up"}
      </motion.button>

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
