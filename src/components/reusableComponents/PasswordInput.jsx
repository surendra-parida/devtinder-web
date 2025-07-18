import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({ register, error }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
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
      {error && (
        <div className="text-sm text-red-500 mt-1 whitespace-pre-line">
          {error.message}
        </div>
      )}
    </div>
  );
}
