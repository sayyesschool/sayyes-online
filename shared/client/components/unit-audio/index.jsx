import React, { useState, useCallback } from 'react';

import AudioPlayer from 'shared/components/audio-player';
import AudioList from 'shared/components/audio-list';

export default function UnitAudio({ unit }) {
    const [selectedAudio, setSelectedAudio] = useState();

    const handleClick = useCallback(audio => {
        setSelectedAudio(audio);
    }, []);

    return (
        <div className="lesson-audio">
            <AudioList
                audios={unit.audios}
                selectedAudio={selectedAudio}
                onClick={handleClick}
            />

            {selectedAudio &&
                <AudioPlayer
                    src={selectedAudio.url}
                    width="100%"
                    autoPlay
                />
            }
        </div>
    );
}