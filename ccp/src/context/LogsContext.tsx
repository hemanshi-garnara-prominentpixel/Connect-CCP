import { createContext, useContext, useState, useMemo } from "react";

type LogsContextType = {
  logs: string[];
  addLog: (msg: string) => void;
  clearLogs: () => void;
};

const LogsContext = createContext<LogsContextType | undefined>(undefined);

export const LogsProvider = ({ children }: { children: React.ReactNode }) => {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const clearLogs = () => setLogs([]);

  const value = useMemo(() => ({ logs, addLog, clearLogs }), [logs]);

  return <LogsContext.Provider value={value}>{children}</LogsContext.Provider>;
};

export const useLogs = () => {
  const ctx = useContext(LogsContext);
  if (!ctx) throw new Error("useLogs must be used inside LogsProvider");
  return ctx;
};
