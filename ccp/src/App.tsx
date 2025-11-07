import Dashboard from "./pages/Dashboard";
import { ConnectProvider } from "./context/ConnectContext";

function App() {
  return (
    <ConnectProvider>
      <Dashboard />
    </ConnectProvider>
  );
}

export default App;
