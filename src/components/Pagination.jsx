export default function Pagination({
  page,
  totalPages,
  onNext,
  onPrev,
  onClear,
}) {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12">
        <div className="flex gap-3">
          <button
            onClick={onPrev}
            disabled={page === 1}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              page === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Previous
          </button>
          <button
            onClick={onNext}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              page === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Next
          </button>
        </div>

        <button
          onClick={onClear}
          className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition"
        >
          Clear Feed
        </button>
      </div>

      <p className="text-center text-sm text-gray-400 mt-6 mb-20">
        Page <strong>{page}</strong> of <strong>{totalPages}</strong>
      </p>
    </>
  );
}
