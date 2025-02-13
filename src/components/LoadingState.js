import React from 'react';
import { Button, Stack } from '@mui/material';
import { LoadingIndicator } from '@stream-io/video-react-sdk';
import { Link } from 'react-router-dom';

const ErrorPanel = ({ error }) => (
  <Stack
    className="error-panel"
    alignItems="center"
    justifyContent="center"
    height="100%"
  >
    <h2>Error</h2>
    <p>{error.message}</p>
    <p>
      <Link to="/">
        <Button variant="contained">Start again</Button>
      </Link>
    </p>
  </Stack>
);

const LoadingPanel = ({ message }) => (
  <Stack
    className="loading-panel"
    alignItems="center"
    justifyContent="center"
    height="100%"
  >
    <LoadingIndicator text={message} />
  </Stack>
);

export { ErrorPanel, LoadingPanel };