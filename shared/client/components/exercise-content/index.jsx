import React from 'react';
import {
    Avatar,
    Card
} from 'mdc-react';

import AudioPlayer from 'shared/components/audio-player';
import VideoPlayer from 'shared/components/video-player';

import './index.scss';

export default function ExerciseContent({ number, exercise }) {
    return (
        <Card className="exercise-content" outlined>
            <Card.Header
                graphic={<Avatar className="exercise-number" text={number} />}
                title={exercise.description}
            />

            {exercise.image &&
                <img
                    src={exercise.imageUrl}
                />

            }

            {exercise.audio &&
                <AudioPlayer
                    src={exercise.audio.src}
                    width="100%"
                />
            }

            {exercise.video &&
                <Card.Media wide>
                    <VideoPlayer
                        id="video-player"
                        src={exercise.video.src}
                        controls={false}
                        options={{
                            stretching: 'fill'
                        }}
                    />
                </Card.Media>
            }
        </Card>
    );
}