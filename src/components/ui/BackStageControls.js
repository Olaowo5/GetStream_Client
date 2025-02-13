import React, { useEffect, useState } from 'react';
import './BackStage.css';
import {
  useCall,
  useCallStateHooks,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  CancelCallButton,
  LoadingIndicator,
} from '@stream-io/video-react-sdk';

export const BackstageControls = () => {
  const call = useCall();
  if (!call) return null;

  return (
    <div className="backstage-controls">
      <ToggleAudioPublishingButton caption="" />
      <ToggleVideoPublishingButton caption="" />
      <CancelCallButton />
      <ToggleLivestreamButton call={call} />
    </div>
  );
};

const ToggleLivestreamButton = ({ call }) => {
  const { useIsCallHLSBroadcastingInProgress, useCallIngress } = useCallStateHooks();
  const ingress = useCallIngress();
  const isBroadcasting = useIsCallHLSBroadcastingInProgress();
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);

  useEffect(() => {
    setIsAwaitingResponse(false);
  }, [isBroadcasting]);

  useEffect(() => {
    if (ingress) console.log(`RTMP address: ${ingress.rtmp.address}`);
  }, [ingress]);

  return (
    <button
      type="button"
      className={`livestream-toggle-button ${isBroadcasting ? 'broadcasting' : ''}`}
      onClick={async () => {
        setIsAwaitingResponse(true);
        try {
          isBroadcasting ? await call.stopLive() : await call.goLive({ start_hls: true });
        } catch (err) {
          console.error('Livestream error', err);
        }
      }}
    >
      {isAwaitingResponse ? <LoadingIndicator /> : isBroadcasting ? <EndBroadcastIcon /> : <StartBroadcastIcon />}
      <span>{isBroadcasting ? 'End Stream' : 'Start Stream'}</span>
    </button>
  );
};

const StartBroadcastIcon = () => (
  <svg width="25" height="18" viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.2 14.2996C5.8375 12.9496 5 11.0746 5 8.99961C5 6.92461 5.8375 5.04961 7.2 3.69961L8.975 5.47461..." fill="#FCFCFC"/>
  </svg>
);

const EndBroadcastIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.55615 10.8184C8.44365 11.2309 8.38115 11.6684 8.38115 12.1184C8.38115 13.4934..." fill="#FCFCFC"/>
  </svg>
);


