import { createContext, useContext, useState, useMemo } from "react";

export type AgentType = {
  agentName: string;
  agentStatus: string;
  permission: string[];
};

type AgentContextType = {
  agent: AgentType;
  setAgent: React.Dispatch<React.SetStateAction<AgentType>>;
};

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider = ({ children }: { children: React.ReactNode }) => {
  const [agent, setAgent] = useState<AgentType>({
    agentName: "Not logged in",
    agentStatus: "Offline",
    permission: [],
  });

  const value = useMemo(() => ({ agent, setAgent }), [agent]);

  return (
    <AgentContext.Provider value={value}>{children}</AgentContext.Provider>
  );
};

export const useAgent = () => {
  const ctx = useContext(AgentContext);
  if (!ctx) throw new Error("useAgent must be used inside AgentProvider");
  return ctx;
};
