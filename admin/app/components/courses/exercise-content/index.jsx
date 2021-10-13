import React, { createElement } from 'react';
import {
    Typography
} from 'mdc-react';
import classnames from 'classnames';

import AudioContent from 'shared/components/audio-content';
import VideoPlayer from 'shared/components/video-player';

import BooleanExerciseContent from './boolean-exercise-content';
import ChoiceExerciseContent from './choice-exercise-content';
import EssayExerciseContent from './essay-exercise-content';
import FIBExerciseContent from './fib-exercise-content';
import InputExerciseContent from './input-exercise-content';
import TextExerciseContent from './text-exercise-content';

import './index.scss';

const Components = {
    boolean: BooleanExerciseContent,
    choice: ChoiceExerciseContent,
    essay: EssayExerciseContent,
    fib: FIBExerciseContent,
    input: InputExerciseContent,
    text: TextExerciseContent
};

export default function ExerciseContent({ exercise }) {
    const classNames = classnames('exercise-content', `exercise-content--${exercise.type}`);

    return (
        <div className={classNames}>
            {exercise.description &&
                <Typography className="exercise-description" type="subtitle1">{exercise.description}</Typography>
            }

            {exercise.image &&
                <img
                    className="exercise-image"
                    src={exercise.imageUrl}
                    alt=""
                />
            }

            {exercise.audio &&
                <AudioContent
                    className="exercise-audio"
                    audio={exercise.audio}
                />
            }

            {exercise.video &&
                <section className="exercise-video">
                    <VideoPlayer
                        id="video-player"
                        src={exercise.video.url}
                        controls
                        options={{
                            stretching: 'fill'
                        }}
                    />
                </section>
            }

            {exercise.type &&
                createElement(Components[exercise.type], {
                    exercise
                })
            }
        </div>
    );
}