import FeedSkeleton from "./FeedSkeleton";

export default function FeedHeader({ status, error, feedLength }) {
  if (status === "loading") {
    return <FeedSkeleton count={5} />;
  }

  if (status === "failed") {
    return <p className="text-center text-red-500 font-medium">{error}</p>;
  }

  if (status === "succeeded" && feedLength === 0) {
    return (
      <p className="text-center text-gray-400 font-medium">
        No profiles found.
      </p>
    );
  }

  return null;
}
