import { useEffect, useRef } from "react";
import "amazon-connect-streams";
import { useAgent } from "../context/AgentContext";
import { useLogs } from "../context/LogsContext";
import { useCallHistory } from "../context/CallHistoryContext";

const CCPContainer = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const { setAgent } = useAgent();
  const { addLog } = useLogs();
  const { setCurrentCall, addCallHistory } = useCallHistory();
  useEffect(() => {
    if (!window.connect) {
      addLog("Amazon Connect Streams API not loaded!");
      return;
    }
    if (!divRef.current) return;

    addLog("Initializing CCP...");

    window.connect.core.initCCP(divRef.current, {
      ccpUrl: "https://digiclarity-training.my.connect.aws/connect/ccp-v2/",
      loginPopup: true,
      loginPopupAutoClose: true,
    });

    window.connect.agent((agent) => {
      const agentName = agent.getName();
      const agentStatus = agent.getAvailabilityState().state;
      const permission = agent.getPermissions();

      setAgent({ agentName, agentStatus, permission });
      addLog(`Agent Logged In: ${agentName}`);
      addLog(`Agent have Permission: ${permission.join(", ")}`);

      agent.onStateChange((stateChange) => {
        const newState = stateChange.newState;
        setAgent((prev) => ({ ...prev, agentStatus: newState }));
        addLog(`Agent State Changed: ${newState} ( ${agentName} )`);
      });
    });

    connect.contact((contact) => {
      const callDetails = {
        date: new Date().toLocaleDateString(),
        startTime: new Date().toLocaleTimeString(),
        endTime: null,
        customerNumber:
          contact.getInitialConnection()?.getEndpoint().phoneNumber ||
          "Unknown",
        contactId: contact.getContactId(),
        type: (contact.isInbound() ? "Incoming" : "Outgoing") as
          | "Incoming"
          | "Outgoing",
        status: "Connecting",
      };

      contact.onConnecting(() => {
        addLog(`Call connecting with ${callDetails.customerNumber}`);
        setCurrentCall({
          isActive: true,
          status: "Ringing",
          customerNumber: callDetails.customerNumber,
        });
      });
      contact.onConnected(() => {
        addLog(`Call Connected with ${callDetails.customerNumber}`);
        setCurrentCall({
          isActive: true,
          status: "Connected",
          customerNumber: callDetails.customerNumber,
        });
      });
      contact.onMissed(() => {
        callDetails.status = "Missed";
        addLog(`Missed Call from ${callDetails.customerNumber}`);
        setCurrentCall({
          isActive: true,
          status: "Missed",
          customerNumber: callDetails.customerNumber,
        });
      });
      contact.onEnded(() => {
        addLog(`Call Ended`);
        setCurrentCall({
          isActive: false,
          status: "Completed",
          customerNumber: callDetails.customerNumber,
        });
        addCallHistory({
          ...callDetails,
          endTime: new Date().toLocaleTimeString(),
          status: callDetails.status === "Missed" ? "Missed" : "Completed",
        });
        setTimeout(() => {
          setCurrentCall({
            isActive: false,
            status: "Idle",
            customerNumber: null,
          });
        }, 3000);
      });

      contact.onError((err) => addLog(`Error: ${JSON.stringify(err)}`));
    });
  }, []);

  return <div ref={divRef} className="flex-1 min-h-[450px]" />;
};

export default CCPContainer;
