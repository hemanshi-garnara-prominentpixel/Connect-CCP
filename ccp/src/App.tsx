import Dashboard from "./pages/Dashboard";
import { LogsProvider } from "./context/LogsContext";
import { AgentProvider } from "./context/AgentContext";
import { CallHistoryProvider } from "./context/CallHistoryContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <LogsProvider>
      <AgentProvider>
        <CallHistoryProvider>
          <Dashboard />
          <ToastContainer position="top-right" autoClose={2000} />
        </CallHistoryProvider>
      </AgentProvider>
    </LogsProvider>
  );
}

export default App;
