import { useCallback, useEffect, useState } from 'react';

import { Button } from '@material-ui/core';

import { useVideoInputDevices } from '../../../hooks/deviceHooks/deviceHooks';
import useMediaStreamTrack from '../../../hooks/useMediaStreamTrack/useMediaStreamTrack';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

import { DEFAULT_VIDEO_CONSTRAINTS } from '../../../constants';

import FlipCameraIcon from './FlipCameraIcon';

export default function FlipCameraButton() {
    const { localTracks } = useVideoContext();
    const [supportsFacingMode, setSupportsFacingMode] = useState(null);
    const videoTrack = localTracks.find(track => track.name.includes('camera'));
    const mediaStreamTrack = useMediaStreamTrack(videoTrack);
    const videoDeviceList = useVideoInputDevices();

    useEffect(() => {
    // The 'supportsFacingMode' variable determines if this component is rendered
    // If 'facingMode' exists, we will set supportsFacingMode to true.
    // However, if facingMode is ever undefined again (when the user unpublishes video), we
    // won't set 'supportsFacingMode' to false. This prevents the icon from briefly
    // disappearing when the user switches their front/rear camera.
        const currentFacingMode = mediaStreamTrack?.getSettings().facingMode;
        if (currentFacingMode && supportsFacingMode === null) {
            setSupportsFacingMode(true);
        }
    }, [mediaStreamTrack, supportsFacingMode]);

    const toggleFacingMode = useCallback(() => {
        const newFacingMode = mediaStreamTrack?.getSettings().facingMode === 'user' ? 'environment' : 'user';
        videoTrack.restart({
            ...(DEFAULT_VIDEO_CONSTRAINTS),
            facingMode: newFacingMode
        });
    }, [mediaStreamTrack, videoTrack]);

    return supportsFacingMode && videoDeviceList.length > 1 ? (
        <Button disabled={!videoTrack} startIcon={<FlipCameraIcon />} onClick={toggleFacingMode}>
      Flip Camera
        </Button>
    ) : null;
}
