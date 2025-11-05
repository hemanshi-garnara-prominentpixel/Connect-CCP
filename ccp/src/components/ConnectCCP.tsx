import React, { useEffect, useRef, useState } from "react";
import "amazon-connect-streams";

const ConnectCCP = () => {
  const divRef = useRef<HTMLDivElement | null>(null);

  const [logs, setLogs] = useState<string[]>([]);
  const [agentName, setAgentName] = useState("Not logged in");
  const [status, setStatus] = useState("Offline");

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  useEffect(() => {
    if (!window.connect) {
      console.error("Amazon Connect Streams API not loaded!");
      return;
    }
    if (!divRef.current) return;

    // if ((window as any)._ccpInitialized) {
    //   addLog("CCP already initialized, skipping");
    //   return;
    // }
    // (window as any)._ccpInitialized = true;

    addLog("Initializing CCP inside iframe...");

    window.connect.core.initCCP(divRef.current, {
      ccpUrl: "https://digiclarity-training.my.connect.aws/connect/ccp-v2/",
      loginPopup: true,
      loginPopupAutoClose: true,
      region: "ap-south-1",
      softphone: {
        allowFramedSoftphone: true,
        disableRingtone: false,
      },
    });

    window.connect.agent((agent) => {
      const name = agent.getName();
      setAgentName(name);
      setStatus(agent.getAvailabilityState().state);
      addLog(`Agent Logged In: ${name}`);

      agent.onStateChange((stateChange) => {
        const newState = stateChange.newState;
        setStatus(newState);
        addLog(`Agent State Changed: ${newState}`);
      });
    });
  }, []);

  return (
    <div className="p-4 space-y-6">
      <div className="flex gap-4 ">
        <div
          ref={divRef}
          className="flex-1 h-[450px] border border-gray-300 rounded-lg shadow-sm bg-white"
        ></div>
        <div className="w-[300px] p-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-800 space-y-4">
          <h2 className="text-lg font-semibold">Agent Details</h2>

          <p>
            <span className="font-semibold">Agent:</span> {agentName}
          </p>

          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`px-2 py-1 rounded text-white text-sm ${
                status === "Available"
                  ? "bg-green-500"
                  : status === "Offline"
                  ? "bg-gray-500"
                  : "bg-yellow-500"
              }`}
            >
              {status}
            </span>
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-4">
        <p className="font-semibold text-gray-800 mb-2">Logs:</p>
        <pre className="bg-gray-100 p-3 rounded-lg max-h-72 overflow-y-auto text-sm whitespace-pre-wrap">
          {logs.join("\n")}
        </pre>
      </div>
    </div>
  );
};
export default ConnectCCP;
