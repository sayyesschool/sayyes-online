import { useEffect, useState } from 'react';

export default function useVideoTrackDimensions(track) {
    const [dimensions, setDimensions] = useState(track?.dimensions);

    useEffect(() => {
        setDimensions(track?.dimensions);

        if (track) {
            const handleDimensionsChanged = track => setDimensions({
                width: track.dimensions.width,
                height: track.dimensions.height
            });

            track.on('dimensionsChanged', handleDimensionsChanged);

            return () => {
                track.off('dimensionsChanged', handleDimensionsChanged);
            };
        }
    }, [track]);

    return dimensions;
}