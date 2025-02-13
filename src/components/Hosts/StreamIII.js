import React from 'react';
import { StreamVideo } from '@stream-io/video-react-sdk';
import { Outlet } from 'react-router-dom';
import { useInitVideoClient } from '../../hooks/iseInitVideoClient';

const Hosts = () => {




  const client = useInitVideoClient({});
  if (!client) {
    return null;
  }

  return (
    <StreamVideo client={client}>
      <Outlet />
    </StreamVideo>
  );
};

export default Hosts;