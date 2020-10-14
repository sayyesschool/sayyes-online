import React, { useState, useCallback } from 'react';

import AudioPlayer from 'shared/components/audio-player';
import AudioList from 'shared/components/audio-list';

export default function UnitAudio({ course, unit }) {
    const [selectedAudio, setSelectedAudio] = useState();

    const handleClick = useCallback(audio => {
        setSelectedAudio(audio);
    }, []);

    return (
        <div className="lesson-audio">
            {selectedAudio &&
                <AudioPlayer
                    src={`https://static.sayes.ru/courses/${course.slug}/audios/${selectedAudio}.mp3`}
                    width="100%"
                    autoPlay
                />
            }

            <AudioList
                audios={unit.audios}
                selectedAudio={selectedAudio}
                onClick={handleClick}
            />
        </div>
    );
}