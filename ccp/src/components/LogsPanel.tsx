import { useConnect } from "../context/ConnectContext";

const LogsPanel = () => {
  const { logs, clearLogs } = useConnect();

  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-md p-5 flex flex-col flex-1 min-h-[300px]">
      <div className="flex justify-between items-center mb-3">
        <p className="font-semibold text-gray-900 text-lg">Logs</p>

        <button
          onClick={clearLogs}
          className="px-3 py-1 rounded-md text-sm bg-red-500 hover:bg-red-600 text-white shadow-sm transition"
        >
          Clear Logs
        </button>
      </div>

      <div className="bg-gray-100 rounded-lg p-4 flex-1 overflow-y-auto text-sm max-h-[300px] space-y-2">
        {logs.length === 0 && (
          <p className="text-gray-500 text-center">No logs yet...</p>
        )}

        {[...logs].reverse().map((log, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-md px-3 py-2 shadow-sm text-gray-800"
          >
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogsPanel;
