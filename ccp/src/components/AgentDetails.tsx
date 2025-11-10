import { useAgent } from "../context/AgentContext";

const AgentDetails = () => {
  const { agent } = useAgent();

  return (
    <div className="p-5 bg-white border border-gray-300 rounded-xl shadow-md space-y-2">
      <h2 className="text-lg font-semibold text-gray-900">Agent Details</h2>

      <p className="text-gray-700">
        <span className="font-semibold">Agent:</span> {agent.agentName}
      </p>

      <p className="text-gray-700">
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
  );
};

export default AgentDetails;
