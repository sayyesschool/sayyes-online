import React from 'react';
import {
    Avatar,
    IconButton,
    Card
} from 'mdc-react';

import AudioPlayer from 'shared/components/audio-player';
import VideoPlayer from 'shared/components/video-player';

export default function ExerciseDetails({ exercise, onEdit, onDelete }) {
    return (
        <Card className="exercise-details">
            <Card.Header
                title={exercise.description}
                actions={[
                    <IconButton
                        key="edit"
                        icon="edit"
                        onClick={() => onEdit(exercise)}
                    />,

                    <IconButton
                        key="delete"
                        icon="delete"
                        onClick={() => onDelete(exercise)}
                    />
                ]}
            />

            {exercise.image &&
                <img
                    src={STATIC_URL + exercise.imageUrl}
                />
            }

            {exercise.audio &&
                <AudioPlayer
                    src={exercise.audioUrl}
                    width="100%"
                />
            }

            {exercise.video &&
                <Card.Media wide>
                    <VideoPlayer
                        id="video-player"
                        src={exercise.videoUrl}
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