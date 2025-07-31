export default function ActionButtons({ currentUser, onSwipe }) {
  if (!currentUser) return null;

  return (
    <div className="flex flex-wrap justify-center gap-6 mt-5 px-2 pb-5">
      <button
        onClick={() => onSwipe("left", currentUser._id)}
        className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition"
      >
        <span>👎</span> Ignore
      </button>
      <button
        onClick={() => onSwipe("right", currentUser._id)}
        className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition"
      >
        <span>👍</span> Interest
      </button>
    </div>
  );
}
