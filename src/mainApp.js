import '@stream-io/video-react-sdk/dist/css/styles.css';
import './main.css';

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StreamTheme } from '@stream-io/video-react-sdk';
import { createTheme, ThemeProvider } from '@mui/material';
import SetupLivestream from './components/Hosts/SetupLiveStream';
import Home from './Home';
import Hosts from './components/Hosts/StreamIII';
import Backstage from './components/Hosts/BackStageStream';
import Viewers from './components/Viewers/Viewer';
import HLSLivestreamUI from './components/Viewers/HLSLivestream';
import WebRTCLivestream from './components/Viewers/WebRTCLiveStream';

// Define a Material-UI theme
const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

// Configure the router with routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/hosts',
    element: <Hosts />,
    children: [
      {
        index: true,
        element: <SetupLivestream />,
      },
      {
        path: 'backstage/:callId',
        element: <Backstage />,
      },
    ],
  },
  {
    path: '/viewers',
    element: <Viewers />,
    children: [
      {
        path: 'hls/:callId',
        element: <HLSLivestreamUI />,
      },
      {
        path: 'webrtc/:callId',
        element: <WebRTCLivestream />,
      },
    ],
  },
]);

const MApp = () => {
  return (
    <React.StrictMode>
      <StreamTheme as="main" className="livestream-app">
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </StreamTheme>
    </React.StrictMode>
  );
};

export default MApp;