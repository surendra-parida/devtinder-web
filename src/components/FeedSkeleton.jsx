export default function FeedSkeleton({ count = 5 }) {
  return (
    <div className="grid gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row animate-pulse bg-base-200 border border-base-300 shadow-sm rounded-xl overflow-hidden"
        >
          <div className="w-full sm:w-48 h-48 bg-gray-300" />

          <div className="p-5 flex flex-col gap-3 w-full">
            <div className="h-4 w-1/3 bg-gray-300 rounded" />
            <div className="h-3 w-2/3 bg-gray-300 rounded" />
            <div className="h-3 w-1/2 bg-gray-300 rounded" />

            <div className="flex gap-2 flex-wrap mt-2">
              {[...Array(3)].map((_, i) => (
                <span
                  key={i}
                  className="h-6 w-16 bg-gray-300 rounded-full"
                ></span>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-auto">
              <div className="h-8 w-24 bg-gray-300 rounded-md" />
              <div className="h-8 w-24 bg-gray-300 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
