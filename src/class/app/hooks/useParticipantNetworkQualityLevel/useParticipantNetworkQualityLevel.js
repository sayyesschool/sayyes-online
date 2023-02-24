import { useState, useEffect } from 'react';

export default function useParticipantNetworkQualityLevel(participant) {
    const [networkQualityLevel, setNetworkQualityLevel] = useState(participant.networkQualityLevel);

    useEffect(() => {
        const handleNetworkQualityLevelChange = newNetworkQualityLevel =>
            setNetworkQualityLevel(newNetworkQualityLevel);

        setNetworkQualityLevel(participant.networkQualityLevel);

        participant.on('networkQualityLevelChanged', handleNetworkQualityLevelChange);

        return () => {
            participant.off('networkQualityLevelChanged', handleNetworkQualityLevelChange);
        };
    }, [participant]);

    return networkQualityLevel;
}