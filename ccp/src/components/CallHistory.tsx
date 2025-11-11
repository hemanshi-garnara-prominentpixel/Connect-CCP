import { useCallHistory } from "../context/CallHistoryContext";

const CallHistory = () => {
  const { callHistory } = useCallHistory();

  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-md p-5 flex flex-col flex-1 min-h-[530px]">
      <div className="flex justify-between items-center mb-3">
        <p className="font-semibold text-gray-900 text-lg tracking-wide">
          Call History
        </p>
      </div>

      <div className="bg-gray-100 rounded-lg p-4 flex-1 overflow-y-auto text-sm max-h-[450px] space-y-2">
        {callHistory.length === 0 && (
          <p className="text-gray-600 font-semibold tracking-wide text-center text-lg py-2">
            No call history yet...
          </p>
        )}

        {[...callHistory].reverse().map((call, index) => (
          <div
            key={index}
            className="
              bg-white border border-gray-300 rounded-md px-3 py-3 shadow-sm
              flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3
              transition hover:shadow-lg
            "
          >
            {/* Left side: Type + status dot */}
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  call.status === "Completed"
                    ? "bg-green-500"
                    : call.status === "Missed"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              ></div>
              <span className="font-semibold text-base tracking-wide">
                {call.type}
              </span>
            </div>

            {/* Middle: Customer number */}
            <div className="text-gray-700 text-sm tracking-wide sm:text-center">
              Customer: {call.customerNumber}
            </div>

            {/* Right: Status + time */}
            <div className="flex sm:flex-col gap-2 justify-between sm:items-end text-right text-sm text-gray-600">
              <span
                className={`px-2 py-1 rounded-lg text-xs font-semibold uppercase tracking-wide ${
                  call.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : call.status === "Missed"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {call.status}
              </span>

              <span className="text-xs">{call.date}</span>

              <span className="text-xs">
                {call.startTime} - {call.endTime || "-"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallHistory;
