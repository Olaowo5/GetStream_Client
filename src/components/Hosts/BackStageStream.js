import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  PaginatedGridLayout,
  StreamCall,
  useConnectedUser,
  useStreamVideoClient,
} from '@stream-io/video-react-sdk';
import { BackStageHeader } from '../ui/BackStageHeader';
import { BackstageControls } from '../ui/BackStageControls';
import { useSetCall } from '../../hooks/useSetCall'; // Assuming this is already converted to JS

const Backstage = () => {
  const { callId } = useParams();
  const client = useStreamVideoClient();
  const connectedUser = useConnectedUser();
  const call = useSetCall(client);

  useEffect(() => {
    if (!(call && connectedUser)) return;
    
    
    console.log('Attempting to join call with ID:', callId);
    console.log('Connected User:', connectedUser);

    call.join({
      create: true,
      data: { members: [{ user_id: connectedUser.id, role: 'host' }] },
    })
      .then(() => {
        console.log('Successfully joined the call');
      })
      .catch((error) => {
        console.error('Error joining call', error);
      });

    // Cleanup function to execute when the component unmounts
    return () => {
      if (call) {
        call.leave()
          .then(() => {
            console.log('Successfully left the call');
          })
          .catch(console.error);
      }
    };
  }, [call, connectedUser]);

  if (!callId)  {
    console.warn('No Call ID is provided');
    return <h3>No Call ID is provided</h3>;
  }
  if (!connectedUser) {
    console.log('Loading user data...');
    return <h3>Loading...</h3>;}

  return (
    <>
      {call && (
        <StreamCall call={call}>
          <BackstageUI />
        </StreamCall>
      )}
    </>
  );
};

const BackstageUI = () => {
  return (
    <>
      <BackStageHeader />
      <PaginatedGridLayout />
      <BackstageControls />
    </>
  );
};

export default Backstage;