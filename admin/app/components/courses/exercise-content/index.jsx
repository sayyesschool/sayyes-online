import React, { createElement } from 'react';
import {
    Typography
} from 'mdc-react';
import classnames from 'classnames';

import AudioPlayer from 'shared/components/audio-player';
import VideoPlayer from 'shared/components/video-player';

import BooleanExerciseContent from './boolean-exercise-content';
import ChoiceExerciseContent from './choice-exercise-content';
import TextExerciseContent from './text-exercise-content';
import FIBExerciseContent from './fib-exercise-content';
import EssayExerciseContent from './essay-exercise-content';

import './index.scss';

const ComponentsByType = {
    boolean: BooleanExerciseContent,
    choice: ChoiceExerciseContent,
    text: TextExerciseContent,
    fib: FIBExerciseContent,
    essay: EssayExerciseContent
};

export default function ExerciseContent({ exercise }) {
    return (
        <div className={classnames('exercise-content', `exercise-content--${exercise.type}`)}>
            {exercise.description &&
                <Typography>{exercise.description}</Typography>
            }

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
                <VideoPlayer
                    id="video-player"
                    src={exercise.videoUrl}
                    controls
                    options={{
                        stretching: 'fill'
                    }}
                />
            }

            {exercise.type && createElement(ComponentsByType[exercise.type], {
                key: exercise.id,
                exercise
            })}
        </div>
    );
}