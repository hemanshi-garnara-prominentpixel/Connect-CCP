import CCPContainer from "../components/CCPContainer";
import AgentDetails from "../components/AgentDetails";
import LogsPanel from "../components/LogsPanel";

const Dashboard = () => {
  return (
    <div className="p-4 h-screen bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_800px] gap-4 h-full">
        <div className="bg-white border border-gray-300 rounded-xl shadow-md overflow-hidden min-h-[450px] flex flex-col">
          <div className="p-3 border-b bg-gray-100 text-sm font-semibold text-gray-700">
            Contact Control Panel (CCP)
          </div>

          <CCPContainer />
        </div>

        <div className="flex flex-col gap-6">
          <AgentDetails />
          <LogsPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
