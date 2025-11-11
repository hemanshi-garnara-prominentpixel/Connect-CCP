import { useState } from "react";
import CCPContainer from "../components/CCPContainer";
import AgentDetails from "../components/AgentDetails";
import LogsPanel from "../components/LogsPanel";
import CallHistory from "../components/CallHistory";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"agent" | "logs" | "history">(
    "agent"
  );

  return (
    <div className="h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-4 h-full">
        <div className="bg-white border border-gray-300 rounded-xl shadow-md min-h-[500px] overflow-hidden flex flex-col">
          <div className="p-3 border-b bg-gray-100 text-sm font-semibold text-gray-700">
            Contact Control Panel (CCP)
          </div>
          <CCPContainer />
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white border border-gray-300 rounded-xl shadow-md p-3 flex gap-3">
            <button
              onClick={() => setActiveTab("agent")}
              className={`px-4 py-2 rounded-md font-medium transition ${
                activeTab === "agent"
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-200 text-gray-700"
              }`}
            >
              Agent Info
            </button>

            <button
              onClick={() => setActiveTab("logs")}
              className={`px-4 py-2 rounded-md font-medium transition ${
                activeTab === "logs"
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-200 text-gray-700"
              }`}
            >
              Logs
            </button>

            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-2 rounded-md font-medium transition ${
                activeTab === "history"
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-200 text-gray-700"
              }`}
            >
              History
            </button>
          </div>

          <div className=" flex-1 overflow-y-auto">
            {activeTab === "agent" && <AgentDetails />}
            {activeTab === "logs" && <LogsPanel />}
            {activeTab === "history" && <CallHistory />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
