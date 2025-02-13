import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LeaveBadge } from '../../Componots';
import './Viewercontrols.css';
import { useCall } from '@stream-io/video-react-sdk';

const ViewerControls = () => {
  const call = useCall();
  const navigate = useNavigate();

  const onClickHandler = async () => {
    if (call) {
      await call.leave();
    }
    navigate('/');
  };

  return (
    <div className="viewer-controls">
      <button
        className="viewer-control-button"
        type="button"
        onClick={onClickHandler}
      >
        <LeaveBadge />
        <span>Leave Stream</span>
      </button>
    </div>
  );
};

export default ViewerControls;