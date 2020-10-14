import React from 'react';
import {
    Avatar,
    IconButton,
    Card
} from 'mdc-react';

import AudioPlayer from 'shared/components/audio-player';
import VideoPlayer from 'shared/components/video-player';

export default function ExerciseDetails({ exercise, number, onEdit, onDelete }) {
    return (
        <Card className="exercise-details" outlined>
            <Card.Header
                graphic={<Avatar text={number} />}
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
                    src={exercise.imageUrl}
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