import React, { createContext, useContext, useState } from "react";

type AgentType = {
  name: string;
  status: string;
  permission: string[];
};

type ConnectContextType = {
  logs: string[];
  addLog: (msg: string) => void;
  clearLogs: () => void;
  agent: AgentType;
  setAgent: React.Dispatch<React.SetStateAction<AgentType>>;
};

const ConnectContext = createContext<ConnectContextType | undefined>(undefined);

export const ConnectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [agent, setAgent] = useState<AgentType>({
    name: "Not logged in",
    status: "Offline",
    permission: [],
  });

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const clearLogs = () => setLogs([]);

  return (
    <ConnectContext.Provider
      value={{ logs, addLog, clearLogs, agent, setAgent }}
    >
      {children}
    </ConnectContext.Provider>
  );
};

// ✅ custom hook for easy use
export const useConnect = () => {
  const ctx = useContext(ConnectContext);
  if (!ctx) throw new Error("useConnect must be used inside <ConnectProvider>");
  return ctx;
};
