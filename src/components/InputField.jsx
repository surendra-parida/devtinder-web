export default function InputField({
  label,
  name,
  type = "text",
  register,
  error,
}) {
  return (
    <div className="mb-5">
      <input
        placeholder={label}
        type={type}
        {...register(name)}
        className="input input-bordered w-full"
      />
      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
}
