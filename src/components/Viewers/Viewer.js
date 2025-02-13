import React, { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import {
  StreamCall,
  StreamVideo,
  useStreamVideoClient,
} from '@stream-io/video-react-sdk';
import { Button, Input, Stack, Typography } from '@mui/material';
import { useSetCall } from '../../hooks/useSetCall';
import { useInitVideoClient } from '../../hooks/iseInitVideoClient';

import { ErrorPanel, LoadingPanel } from '../LoadingState';

const Viewers = () => {
    
  const { callId } = useParams();
    
    
    const client = useInitVideoClient({});

  if (!client) {
    return null;
  }

  return (
    <StreamVideo client={client}>
      {!callId ? <SetupForm /> : <ViewerLivestream />}
    </StreamVideo>
  );
};

const ViewerLivestream = () => {
  const client = useStreamVideoClient();
  const call = useSetCall(client);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!call) {
      return;
    }
    call
      .get()
      .catch(setError)
      .finally(() => setLoading(false));
  }, [call]);

  if (error) return <ErrorPanel error={error} />;
  if (loading) return <LoadingPanel message="Loading the call data" />;

  return (
    <>
      {call && (
        <StreamCall call={call}>
          <Outlet />
        </StreamCall>
      )}
    </>
  );
};

const SetupForm = () => {
  const [callId, setCallId] = useState('');
  return (
    <Stack justifyContent="center" alignItems="center" flexGrow={1} spacing={3}>
      <Typography variant="h3">Join Livestream</Typography>
      <Input
        placeholder="Enter Call ID"
        value={callId}
        onChange={(e) => {
          setCallId(e.target.value);
        }}
      />
      <Stack direction="row" spacing={3}>
        <Link to={callId ? `/viewers/webrtc/${callId}` : '#'}>
          <Button variant="contained" disabled={!callId}>
            Join (WebRTC)
          </Button>
        </Link>
        <Link to={callId ? `/viewers/hls/${callId}` : '#'}>
          <Button variant="contained" disabled={!callId}>
            Join (HLS)
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};

export default Viewers;