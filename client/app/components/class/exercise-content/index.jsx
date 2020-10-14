import React from 'react';
import {
    Avatar,
    Card
} from 'mdc-react';

import AudioPlayer from 'shared/components/audio-player';
import VideoPlayer from 'shared/components/video-player';

import './index.scss';

export default function ExerciseContent({ number, course, unit, lesson, exercise }) {
    return (
        <Card className="exercise-content" outlined>
            <Card.Header
                graphic={<Avatar className="exercise-number" text={number} />}
                title={exercise.description}
            />

            {exercise.image &&
                <img
                    src={`https://static.sayes.ru/courses/${course.slug}/images/${exercise.image}`}
                />

            }

            {exercise.audio &&
                <AudioPlayer
                    src={`https://static.sayes.ru/courses/${course.slug}/audios/${exercise.audio}.mp3`}
                    width="100%"
                />
            }

            {exercise.video &&
                <Card.Media wide>
                    <VideoPlayer
                        id="video-player"
                        src={`https://static.sayes.ru/courses/${course.slug}/videos/${exercise.video}`}
                        controls
                        options={{
                            stretching: 'fill'
                        }}
                    />
                </Card.Media>
            }
        </Card>
    );
}