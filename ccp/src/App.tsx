import Dashboard from "./pages/Dashboard";
import { LogsProvider } from "./context/LogsContext";
import { AgentProvider } from "./context/AgentContext";
import { CallHistoryProvider } from "./context/CallHistoryContext";

function App() {
  return (
    <LogsProvider>
      <AgentProvider>
        <CallHistoryProvider>
          <Dashboard />
        </CallHistoryProvider>
      </AgentProvider>
    </LogsProvider>
  );
}

export default App;
