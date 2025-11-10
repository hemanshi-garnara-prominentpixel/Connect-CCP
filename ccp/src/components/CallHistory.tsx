import { useCallHistory } from "../context/CallHistoryContext";

const CallHistory = () => {
  const { callHistory } = useCallHistory();

  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-md p-5 flex flex-col flex-1 min-h-[300px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg text-gray-800">Call History</h2>

        {/* {callHistory.length > 0 && (
          <button
            onClick={clearHistory}
            className="px-3 py-1 rounded-md text-sm bg-red-500 hover:bg-red-600 text-white shadow-sm transition"
          >
            Clear All
          </button>
        )} */}
      </div>

      {callHistory.length === 0 ? (
        <p className="text-gray-500 text-center py-6 italic">
          No call history yet...
        </p>
      ) : (
        <div className="overflow-x-auto max-h-[290px] overflow-y-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-gray-50 border-b border-gray-200 text-gray-700">
              <tr>
                {/* <th className="py-2 px-3 text-left font-semibold">
                  Contact ID
                </th> */}
                <th className="py-2 px-3 text-left font-semibold">Type</th>
                <th className="py-2 px-3 text-left font-semibold">Customer</th>
                <th className="py-2 px-3 text-left font-semibold">Date</th>
                <th className="py-2 px-3 text-left font-semibold">Start</th>
                <th className="py-2 px-3 text-left font-semibold">End</th>
                <th className="py-2 px-3 text-left font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {callHistory.map((call, i) => (
                <tr
                  key={i}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-200 transition "
                >
                  {/* <td className="py-2 px-3 text-xs text-gray-600 truncate max-w-[120px]">
                    {call.contactId}
                  </td> */}

                  <td className="py-2 px-3">
                    <span
                      className={`px-2 py-1 text-sm font-medium ${
                        call.type === "Incoming"
                          ? " text-blue-700"
                          : " text-purple-700"
                      }`}
                    >
                      {call.type}
                    </span>
                  </td>

                  <td className="py-2 px-3">{call.customerNumber}</td>
                  <td className="py-2 px-3">{call.date}</td>
                  <td className="py-2 px-3">{call.startTime}</td>
                  <td className="py-2 px-3">{call.endTime || "-"}</td>

                  <td className="py-2 px-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold
                      ${
                        call.status === "Completed"
                          ? "bg-blue-100 text-blue-700"
                          : call.status === "Missed"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {call.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CallHistory;
