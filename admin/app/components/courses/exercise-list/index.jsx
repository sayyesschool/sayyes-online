import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    IconButton,
    List
} from 'mdc-react';

export default function ExerciseList({ exercise: activeExercise, exercises, onDelete }) {
    const handleClick = useCallback((event, exercise) => {
        event.preventDefault();
        event.stopPropagation();

        onDelete(exercise);
    }, []);

    return (
        <List className="exercise-list" avatarList>
            {exercises.map((exercise, index) =>
                <List.Item
                    key={exercise.id}
                    component={Link}
                    to={exercise.url}
                    graphic={<Avatar text={index + 1} />}
                    text={exercise.description}
                    meta={
                        <IconButton
                            icon="delete"
                            onClick={event => handleClick(event, exercise)}
                        />
                    }
                    activated={exercise === activeExercise}
                />
            )}
        </List>
    );
}