import { useEffect, useState } from 'react';

export default function useParticipantNetworkQualityLevel(participant) {
    const [networkQualityLevel, setNetworkQualityLevel] = useState(participant.networkQualityLevel);

    useEffect(() => {
        function handleNetworkQualityLevelChange(newNetworkQualityLevel) {
            setNetworkQualityLevel(newNetworkQualityLevel);
        }

        setNetworkQualityLevel(participant.networkQualityLevel);

        participant.on('networkQualityLevelChanged', handleNetworkQualityLevelChange);

        return () => {
            participant.off('networkQualityLevelChanged', handleNetworkQualityLevelChange);
        };
    }, [participant]);

    return networkQualityLevel;
}