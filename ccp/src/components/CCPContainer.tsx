import { useEffect, useRef } from "react";
import { useConnect } from "../context/ConnectContext";
import "amazon-connect-streams";

const CCPContainer = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const { addLog, setAgent } = useConnect();

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
      const name = agent.getName();
      const status = agent.getAvailabilityState().state;
      const permission = agent.getPermissions();

      setAgent({ name, status, permission });
      addLog(`Agent Logged In: ${name}`);
      addLog(`Agent have Permission: ${permission.join(", ")}`);

      agent.onStateChange((stateChange) => {
        const newState = stateChange.newState;
        setAgent((prev) => ({ ...prev, status: newState }));
        addLog(`Agent State Changed: ${newState}`);
      });
    });

    connect.contact((contact) => {
      contact.onIncoming(() => {
        addLog(`Call is ringing for the agent`);
      });

      contact.onConnecting(() => addLog(`Call connecting...`));
      contact.onConnected(() => addLog(`Call Connected`));
      contact.onMissed(() => addLog(`Missed Call`));
      contact.onEnded(() => addLog(`Call Ended`));
      contact.onError((err) => addLog(`Error: ${JSON.stringify(err)}`));
    });
  }, []);

  return <div ref={divRef} className="flex-1 min-h-[450px]" />;
};

export default CCPContainer;
