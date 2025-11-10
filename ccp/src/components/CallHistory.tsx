import { useCallHistory } from "../context/CallHistoryContext";

const CallHistory = () => {
  const { callHistory } = useCallHistory();

  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-md p-5 flex flex-col flex-1 min-h-[300px]">
      <div className="flex justify-between items-center mb-3">
        <p className="font-semibold text-gray-900 text-lg">Call History</p>
      </div>

      <div className="bg-gray-100 rounded-lg p-4 flex-1 overflow-y-auto text-sm max-h-[300px] space-y-2">
        {callHistory.length === 0 && (
          <p className="text-gray-500 text-center">No call history yet...</p>
        )}

        {[...callHistory].reverse().map((call, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-md px-3 py-2 shadow-sm flex justify-between items-center"
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  call.status === "Completed" ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span className={`font-semibold text-base`}>{call.type}</span>
            </div>

            <div className="text-gray-600 text-sm">
              Customer: {call.customerNumber}
            </div>

            <div className="flex flex-col items-end text-right text-sm text-gray-500">
              <span
                className={`px-2 mb-2 py-1 rounded-lg text-xs font-semibold uppercase tracking-wide ${
                  call.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : call.status === "Missed"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {call.status}
              </span>
              <span className="mb-1">{call.date}</span>
              <span>
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
