import { useState } from "react";
import CCPContainer from "../components/CCPContainer";
import AgentDetails from "../components/AgentDetails";
import LogsPanel from "../components/LogsPanel";
import CallHistory from "../components/CallHistory";
import CurrentCallStatus from "../components/CurrentCallStatus";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"logs" | "history">("logs");

  return (
    <div className="p-4 h-screen bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_800px] gap-4 h-full">
        <div className="bg-white border border-gray-300 rounded-xl shadow-md overflow-hidden min-h-[500px] flex flex-col">
          <div className="p-3 border-b bg-gray-100 text-sm font-semibold text-gray-700">
            Contact Control Panel (CCP)
          </div>
          <CCPContainer />
        </div>
        <div className="flex flex-col gap-4">
          <AgentDetails />
          <CurrentCallStatus />

          <div className="flex items-center bg-white border border-gray-300 rounded-xl shadow-md overflow-hidden">
            <button
              onClick={() => setActiveTab("logs")}
              className={`flex-1 py-2 text-center text-sm font-medium transition ${
                activeTab === "logs"
                  ? "bg-gray-700 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Logs
            </button>

            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 py-2 text-center text-sm font-medium transition ${
                activeTab === "history"
                  ? "bg-gray-700 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              History
            </button>
          </div>
          {activeTab === "logs" ? <LogsPanel /> : <CallHistory />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
