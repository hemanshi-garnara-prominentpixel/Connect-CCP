import { useAgent } from "../context/AgentContext";
import CurrentCallStatus from "./CurrentCallStatus";

const AgentDetails = () => {
  const { agent } = useAgent();

  return (
    <>
      <div className="p-5 bg-white border border-gray-300 rounded-xl shadow-md space-y-2">
        <div className="flex justify-between items-center mb-3">
          <p className="font-semibold text-gray-900 text-lg">Agent Details</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 flex-1 overflow-y-auto text-sm max-h-[300px] space-y-2">
          <div className="bg-white border text-sm tracking-wider border-gray-300 rounded-md px-3 py-2 shadow-sm flex-col-1">
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Agent:</span> {agent.agentName}
            </p>

            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Status:</span>
              <span
                className={`ml-2 px-3 py-1 rounded-lg text-white text-sm tracking-wide ${
                  agent.agentStatus === "Available"
                    ? "bg-green-500"
                    : agent.agentStatus === "Offline"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              >
                {agent.agentStatus}
              </span>
            </p>
            <p className="text-gray-700">
              <span className="font-semibold capitalize">permission:</span>
              <span className="capitalize"> {agent.permission.join(", ")}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <CurrentCallStatus />
      </div>
    </>
  );
};

export default AgentDetails;
