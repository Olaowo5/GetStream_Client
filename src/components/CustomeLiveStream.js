import { useEffect, useState } from "react";
import {
  ParticipantView,
  StreamCall,
  useCallStateHooks,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";

function CustomLivestreamPlayer({ callType, callId }) {
  const client = useStreamVideoClient();
  const [call, setCall] = useState(null);

  useEffect(() => {
    if (!client) {
      console.error('Client not initialized');
      return;
    }

    const myCall = client.call(callType, callId);

    console.log('Attempting to join call:', callType, callId);
    
    setCall(myCall);

    myCall.join().then(() => {
      console.log('Successfully joined call');
    }).catch((e) => {
      console.error("Failed to join call", e);
    });

    return () => {
      myCall.leave().then(() => {
        console.log('Successfully left call');
      }).catch((e) => {
        console.error("Failed to leave call", e);
      });
      setCall(null);
    };
  }, [client, callId, callType]);

  if (!call) return <div>Loading...</div>; // Indicate loading state

  return (
    <StreamCall call={call}>
      <CustomLivestreamLayout />
    </StreamCall>
  );
}

const CustomLivestreamLayout = () => {
  const { useParticipants, useParticipantCount } = useCallStateHooks();
  const participantCount = useParticipantCount();
  const [firstParticipant] = useParticipants();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <div>Live: {participantCount}</div>
      {firstParticipant ? (
        <ParticipantView participant={firstParticipant} />
      ) : (
        <div>The host hasn't joined yet</div>
      )}
    </div>
  );
};

export default CustomLivestreamPlayer;