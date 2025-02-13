import React from 'react';
import { Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { LoadingIndicator } from '@stream-io/video-react-sdk';

const Lobby = ({ isStreaming, autoJoin, setAutoJoin }) => {
  return (
    <div>
      <Typography variant="h4">
        <LoadingIndicator
          className="loading-indicator"
          text={
            isStreaming
              ? 'Stream is ready!'
              : 'Waiting for the livestream to start'
          }
        />
      </Typography>
      <div className="auto-join-container">
        <FormControlLabel
          control={
            <Checkbox
              checked={autoJoin}
              onChange={(e) => setAutoJoin(e.target.checked)}
            />
          }
          label="Join automatically, when stream is ready"
        />
        <Button
          variant="contained"
          disabled={!isStreaming}
          onClick={() => setAutoJoin(true)}
        >
          Join Stream
        </Button>
      </div>
    </div>
  );
};

export default Lobby;