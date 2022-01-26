import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Avatar,
    IconButton,
    List
} from 'mdc-react';

export default function ExercisesList({ exercises, exercise: activeExercise, onDelete }) {
    const handleClick = useCallback((event, exercise) => {
        event.preventDefault();
        event.stopPropagation();

        onDelete(exercise);
    }, []);

    return (
        <List className="exercises-list">
            {exercises.map((exercise, index) =>
                <List.Item
                    key={exercise.id}
                    component={NavLink}
                    to={exercise.uri}
                    avatar={<Avatar key={exercise.id} text={index + 1} />}
                    overlineText={exercise.type}
                    primaryText={exercise.title}
                    secondaryText={exercise.description}
                    trailingIcon={onDelete &&
                        <IconButton
                            icon="delete"
                            onClick={event => handleClick(event, exercise)}
                        />
                    }
                    activated={exercise === activeExercise}
                    activeClassName="mdc-list-item--activated"
                />
            )}
        </List>
    );
}