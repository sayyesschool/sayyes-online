import { createElement, forwardRef, useImperativeHandle, useState } from 'react';
import classnames from 'classnames';

import AudioContent from 'shared/components/audio-content';
import ImagesContent from 'shared/components/images-content';
import TextContent from 'shared/components/text-content';
import VideoContent from 'shared/components/video-content';

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

export default forwardRef(function ExerciseContent({ exercise, checked }, ref) {
    const [state, setState] = useState(exercise?.state);

    useImperativeHandle(ref, () => ({
        get state() { return state; }
    }));

    const classNames = classnames('exercise-content', `exercise-content--${exercise.type}`);

    return (
        <article className={classNames}>
            {exercise.images?.length > 0 &&
                <ImagesContent
                    className="exercise-images"
                    images={exercise.images}
                />
            }

            {exercise.audio &&
                <AudioContent
                    className="exercise-audio"
                    audio={exercise.audio}
                />
            }

            {exercise.video &&
                <VideoContent
                    className="exercise-video"
                    video={exercise.video}
                />
            }

            {exercise.text &&
                <TextContent
                    className="exercise-text"
                    text={exercise.text}
                />
            }

            {exercise.type &&
                createElement(Components[exercise.type], {
                    exercise,
                    checked,
                    state,
                    setState
                })
            }
        </article>
    );
});