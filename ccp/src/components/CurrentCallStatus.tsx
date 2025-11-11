import { useCallHistory } from "../context/CallHistoryContext";

const CurrentCallStatus = () => {
  const { currentCall } = useCallHistory();

  return (
    <div className="p-5 bg-white border border-gray-300 rounded-xl shadow-md space-y-2">
      <div className="flex justify-between items-center mb-3">
        <p className="font-semibold text-gray-900 text-lg">Current Call</p>
      </div>

      <div className="bg-gray-100 rounded-lg p-4 flex-1 overflow-y-auto text-sm max-h-[300px] space-y-2">
        {!currentCall?.isActive ? (
          <div className="bg-white border text-base tracking-wider border-gray-300 rounded-md px-3 py-3 shadow-sm flex flex-col gap-2">
            <p className="text-gray-600 font-semiboldtracking-wide text-center py-2">
              No active call right now
            </p>
          </div>
        ) : (
          <>
            <div className="bg-blue-100 border border-blue-400 text-base tracking-wider rounded-md px-3 py-3 shadow-sm flex flex-col gap-2">
              <p className="text-gray-800">
                <span className="font-semibold">Status:</span>
                <span className="ml-2 px-3 py-1 rounded-lg text-white text-sm tracking-wide bg-blue-600">
                  {currentCall.status}
                </span>
              </p>

              <p className="text-gray-800">
                <span className="font-semibold">Contact Number:</span>{" "}
                <span className="tracking-wider">
                  {currentCall.customerNumber}
                </span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CurrentCallStatus;
