import { createContext, useContext, useState } from "react";
import { saveToStorage, getFromStorage } from "../utils/storage";

export type CallHistory = {
  contactId: string;
  customerNumber: string;
  type: "Incoming" | "Outgoing";
  date: string;
  startTime: string;
  endTime: string | null;
  status: "Completed" | "Missed" | "Connected";
};

type AgentType = {
  agentName: string;
  agentStatus: string;
  permission: string[];
};

type ContextType = {
  logs: string[];
  addLog: (msg: string) => void;
  clearLogs: () => void;

  agent: AgentType;
  setAgent: React.Dispatch<React.SetStateAction<AgentType>>;

  callHistory: CallHistory[];
  addCallHistory: (call: CallHistory) => void;
  clearHistory: () => void;
};

const ConnectContext = createContext<ContextType | undefined>(undefined);

export const ConnectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [agent, setAgent] = useState<AgentType>({
    agentName: "Not logged in",
    agentStatus: "Offline",
    permission: [],
  });

  const [callHistory, setCallHistory] = useState<CallHistory[]>(() =>
    getFromStorage("callHistory")
  );

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const clearLogs = () => setLogs([]);

  const addCallHistory = (call: CallHistory) => {
    setCallHistory((prev) => {
      const updated = [...prev, call];
      saveToStorage("callHistory", updated);
      return updated;
    });
  };

  const clearHistory = () => {
    setCallHistory([]);
    localStorage.removeItem("callHistory");
  };

  return (
    <ConnectContext.Provider
      value={{
        logs,
        addLog,
        clearLogs,
        agent,
        setAgent,
        callHistory,
        addCallHistory,
        clearHistory,
      }}
    >
      {children}
    </ConnectContext.Provider>
  );
};

export const useConnect = () => {
  const ctx = useContext(ConnectContext);
  if (!ctx) throw new Error("useConnect must be used inside ConnectProvider");
  return ctx;
};
