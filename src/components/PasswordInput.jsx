import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function PasswordInput({ register, error }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="relative">
        <input
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          className="input input-bordered w-full pr-10"
        />
        <motion.button
          type="button"
          className="absolute right-3 inset-y-0 my-auto text-gray-500"
          onClick={() => setShowPassword((prev) => !prev)}
          whileTap={{ scale: 0.8 }}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </motion.button>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
