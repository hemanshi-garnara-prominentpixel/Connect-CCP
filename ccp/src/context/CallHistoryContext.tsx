import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export type CallHistoryItem = {
  contactId: string;
  customerNumber: string;
  type: "Incoming" | "Outgoing";
  date: string;
  startTime: string;
  endTime: string | null;
  status: "Completed" | "Missed";
};

type CurrentCallType = {
  isActive: boolean;
  customerNumber: string | null;
  status: "Idle" | "Ringing" | "Connected" | "Missed" | "Completed";
};

type CallHistoryContextType = {
  callHistory: CallHistoryItem[];
  addCallHistory: (call: CallHistoryItem) => void;

  currentCall: CurrentCallType;
  setCurrentCall: React.Dispatch<React.SetStateAction<CurrentCallType>>;
};

const CallHistoryContext = createContext<CallHistoryContextType | undefined>(
  undefined
);

export const CallHistoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [callHistory, setCallHistory] = useState<CallHistoryItem[]>([]);

  const [currentCall, setCurrentCall] = useState<CurrentCallType>({
    isActive: false,
    customerNumber: null,
    status: "Idle",
  });

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/calls/all");
        setCallHistory(res.data.message);
      } catch (error) {
        console.error("Failed to fetch call history", error);
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.message || "Failed to load call history"
          );
        } else {
          toast.error("Unexpected error while loading call history");
        }
      }
    };

    fetchHistory();
  }, []);

  const addCallHistory = async (call: CallHistoryItem) => {
    try {
      const res = await axios.post("http://localhost:5000/api/calls/add", call);

      setCallHistory((prev) => [...prev, res.data.message]);

      toast.success("Call saved successfully");
    } catch (error) {
      console.error("Failed to add call history", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to save call");
      } else {
        toast.error("Unexpected error");
      }
    }
  };

  return (
    <CallHistoryContext.Provider
      value={{
        callHistory,
        addCallHistory,
        currentCall,
        setCurrentCall,
      }}
    >
      {children}
    </CallHistoryContext.Provider>
  );
};

export const useCallHistory = () => {
  const ctx = useContext(CallHistoryContext);
  if (!ctx)
    throw new Error("useCallHistory must be used inside CallHistoryProvider");
  return ctx;
};
