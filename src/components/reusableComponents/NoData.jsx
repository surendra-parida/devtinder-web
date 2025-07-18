const NoData = ({ message = "No data found", height = "h-64" }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${height} bg-gray-50 rounded-md text-gray-500 border border-dashed`}
    >
      <svg
        className="w-12 h-12 mb-2 text-gray-400"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.75v14.5M19.25 12H4.75"
        />
      </svg>
      <p className="text-base font-medium">{message}</p>
    </div>
  );
};

export default NoData;
