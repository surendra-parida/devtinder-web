export default function ActionButtons({ onSwipe }) {
  return (
    <div className="flex justify-center gap-10 mt-6 pb-6">
      <button
        onClick={() => onSwipe("left")}
        className="w-16 h-16 flex items-center justify-center
                   rounded-full border-2 border-red-500
                   text-red-500 text-2xl
                   hover:bg-red-500 hover:text-white
                   transition transform hover:scale-110"
      >
        ❌
      </button>

      <button
        onClick={() => onSwipe("right")}
        className="w-16 h-16 flex items-center justify-center
                   rounded-full border-2 border-green-500
                   text-green-500 text-2xl
                   hover:bg-green-500 hover:text-white
                   transition transform hover:scale-110"
      >
        ❤️
      </button>
    </div>
  );
}
