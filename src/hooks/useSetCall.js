import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  CallingState,
  
} from '@stream-io/video-react-sdk';
//StreamVideoClient,
import { getURLCredentials } from '../utils/getUrlCred';


const DEFAULT_CALL_TYPE = 'livestream';

export const useSetCall = (client) => {
  
  
  const [call, setCall] = useState(undefined);

  const { type } = getURLCredentials();
  const { callId } = useParams();
  
  
 

  useEffect(() => {
    if (!(client && callId)) {
      return;
    }

    const _call = client.call(type || DEFAULT_CALL_TYPE, callId);
    setCall(_call);

    // Exposed for debugging
    window.call = _call;

    return () => {
      if (_call?.state.callingState !== CallingState.LEFT) {
        _call?.leave();
      }
      setCall(undefined);

      // Clean up exposed object
      window.call = undefined;
    };
  }, [client, callId, type]);

  return call;
};