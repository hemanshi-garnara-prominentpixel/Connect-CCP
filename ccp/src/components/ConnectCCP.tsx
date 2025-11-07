import React, { useEffect, useRef, useState } from "react";
import "amazon-connect-streams";

const ConnectCCP = () => {
  const divRef = useRef<HTMLDivElement | null>(null);

  const [logs, setLogs] = useState<string[]>([]);
  const [agent, setAgent] = useState({
    name: "Not logged in",
    status: "Offline",
  });

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  useEffect(() => {
    if (!window.connect) {
      console.error("Amazon Connect Streams API not loaded!");
      return;
    }
    if (!divRef.current) return;

    addLog("Initializing CCP inside iframe...");

    window.connect.core.initCCP(divRef.current, {
      ccpUrl: "https://digiclarity-training.my.connect.aws/connect/ccp-v2/",
      loginPopup: true,
      loginPopupAutoClose: true,
    });

    window.connect.agent((agent) => {
      const name = agent.getName();
      setAgent((prev) => ({
        ...prev,
        name,
        status: agent.getAvailabilityState().state,
      }));

      addLog(`Agent Logged In: ${name}`);

      agent.onStateChange((stateChange) => {
        const newState = stateChange.newState;
        setAgent((prev) => ({ ...prev, status: newState }));
        addLog(`Agent State Changed: ${newState}`);
      });
    });
  }, []);

  return (
    <div className="p-4 h-screen bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_800px] gap-6 h-full">
        <div className="bg-white border border-gray-300 rounded-xl shadow-md overflow-hidden min-h-[450px] flex flex-col">
          <div className="p-3 border-b bg-gray-100 text-sm font-semibold text-gray-700">
            Contact Control Panel (CCP)
          </div>
          <div ref={divRef} className="flex-1"></div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="p-5 bg-white border border-gray-300 rounded-xl shadow-md space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Agent Details
            </h2>

            <p className="text-gray-700">
              <span className="font-semibold">Agent:</span> {agent.name}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`px-3 py-1 rounded-full text-white text-sm tracking-wide ${
                  agent.status === "Available"
                    ? "bg-green-500"
                    : agent.status === "Offline"
                    ? "bg-gray-500"
                    : "bg-yellow-500"
                }`}
              >
                {agent.status}
              </span>
            </p>
          </div>

          <div className="bg-white border border-gray-300 rounded-xl shadow-md p-5 flex flex-col flex-1 min-h-[300px]">
            <div className="flex justify-between items-center mb-3 ">
              <p className="font-semibold text-gray-900 text-lg">Logs</p>

              <button
                onClick={() => setLogs([])}
                className="px-3 py-1 rounded-md text-sm bg-red-500 hover:bg-red-600 text-white shadow-sm transition"
              >
                Clear Logs
              </button>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 flex-1 overflow-y-auto text-sm max-h-[350px] space-y-2">
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
        </div>
      </div>
    </div>
  );
};
export default ConnectCCP;
