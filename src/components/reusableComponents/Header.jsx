import Skeleton from "./Skeleton";

export default function Header({ status, error, length, message }) {
  if (status === "loading") {
    return <Skeleton count={5} />;
  }

  if (status === "failed") {
    return <p className="text-center text-red-500 font-medium">{error}</p>;
  }

  if (status === "succeeded" && length === 0) {
    return <p className="text-center text-gray-400 font-medium">{message}</p>;
  }

  return null;
}
