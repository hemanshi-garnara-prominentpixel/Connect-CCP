import { useCallHistory } from "../context/CallHistoryContext";

const CurrentCallStatus = () => {
  const { currentCall } = useCallHistory();

  if (!currentCall?.isActive) return null;

  return (
    <div className="p-3 rounded-xl shadow-md bg-blue-100 border border-blue-400 space-y-2">
      <h3 className="text-lg font-semibold ">Current Call</h3>

      <p className="font-medium text-gray-700">
        Status:
        <span className="ml-2 px-2 py-1 rounded-md bg-blue-600 text-white text-xs">
          {currentCall.status}
        </span>
      </p>

      <p className="text-gray-800">
        Contact Number:{" "}
        <span className="font-semibold">{currentCall.customerNumber}</span>
      </p>
    </div>
  );
};

export default CurrentCallStatus;
