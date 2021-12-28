import {
    Avatar,
    List
} from 'mdc-react';

import './index.scss';

export default function ExercisesList({ exercises, selectedExercise, selectedExerciseId, selectedExerciseIndex, onSelect }) {
    return (
        <List className="exercises-list">
            {exercises.map((exercise, index) =>
                <List.Item
                    key={exercise.id}
                    avatar={
                        <Avatar key={exercise.id} text={index + 1} size="medium" />
                    }
                    overlineText={exercise.title}
                    primaryText={exercise.description}
                    selected={
                        exercise.id === selectedExercise?.id ||
                        exercise.id === selectedExerciseId ||
                        index === selectedExerciseIndex
                    }
                    onClick={typeof onSelect === 'function' ? () => onSelect(exercise, index) : undefined}
                />
            )}
        </List>
    );
}