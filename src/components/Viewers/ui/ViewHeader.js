import React, { forwardRef, useEffect, useState } from 'react';
import HLS from 'hls.js';
import {
  DurationBadge,
  HDBadge,
  LiveBadge,
  TotalViewersBadge,
} from '../../Componots';
import {
  IconButton,
  MenuToggle,
} from '@stream-io/video-react-sdk';
import clsx from 'clsx';

import './ViewerHeader.css';

const ViewerHeader = ({ hls }) => {
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    if (!hls) return;

    const onLevelLoaded = () => {
      setLevels(hls.levels);
    };

    const onLevelUpdated = () => {
      setSelectedLevel(hls.currentLevel);
    };

    hls.on(HLS.Events.LEVEL_LOADED, onLevelLoaded);
    hls.on(HLS.Events.LEVEL_UPDATED, onLevelUpdated);

    return () => {
      hls.off(HLS.Events.LEVEL_LOADED, onLevelLoaded);
      hls.off(HLS.Events.LEVEL_UPDATED, onLevelUpdated);
    };
  }, [hls]);

  return (
    <div className="viewer-header">
      <div className="section left-section">
        <LiveBadge />
        <TotalViewersBadge />
      </div>
      <div className="section center-section">
        <DurationBadge />
      </div>
      <div className="section right-section">
        <MenuToggle placement="bottom-end" ToggleButton={SettingsButton}>
          <div className="quality-selector">
            <h2 className="quality-selector-title">Settings</h2>
            <div className="quality-selector-body">
              <h4>Select video quality</h4>
              {levels.map((level, index) => (
                <div className="quality-item" key={index}>
                  <input
                    id={`quality-${level.name || index}`}
                    type="radio"
                    name="quality"
                    value={level.id}
                    checked={selectedLevel === level.id}
                    onChange={() => {
                      if (hls && hls.currentLevel !== level.id) {
                        hls.loadLevel = level.id;
                        setSelectedLevel(level.id);
                      }
                    }}
                  />
                  <label
                    htmlFor={`quality-${level.name || index}`}
                    className="quality-label"
                  >
                    {level.name || `Quality ${index}`}
                    <HDBadge />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </MenuToggle>
      </div>
    </div>
  );
};

const SettingsButton = forwardRef((props, ref) => (
  <IconButton
    className={clsx('str-video__device-settings__button', {
      'str-video__device-settings__button--active': props.menuShown,
    })}
    title="Select quality"
    icon="device-settings"
    ref={ref}
  />
));

export default ViewerHeader;