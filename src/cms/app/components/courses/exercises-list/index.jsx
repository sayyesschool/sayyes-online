import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';

import { IconButton, List, Text } from 'shared/ui-components';

export default function ExercisesList({
    exercises,
    selectedExercise,
    onSelect,
    onReorder,
    onDelete
}) {
    return (
        <List className="exercises-list numbered-list" selectable>
            {exercises.map((exercise, index) =>
                <ListItem
                    key={exercise.id}
                    index={index}
                    exercise={exercise}
                    selected={exercise.id === selectedExercise?.id}
                    first={index === 0}
                    last={index === exercises.length - 1}
                    onMove={onReorder}
                    onDelete={onDelete}
                />
            )}
        </List>
    );
}

function ListItem({ index, exercise, selected, first, last, onMove, onDelete }) {
    const handleMoveUp = useCallback(event => {
        event.preventDefault();
        event.stopPropagation();

        onMove(index, -1);
    }, [index, onMove]);

    const handleMoveDown = useCallback(event => {
        event.preventDefault();
        event.stopPropagation();

        onMove(index, 1);
    }, [index, onMove]);

    const handleDelete = useCallback(event => {
        event.preventDefault();
        event.stopPropagation();

        onDelete(exercise);
    }, [exercise, onDelete]);

    return (
        <List.Item
            key={exercise.id}
            as={NavLink}
            to={exercise.uri}
            content={<>
                <Text>{exercise.title}</Text>
                <Text type="body2">{exercise.items?.length} элементов</Text>
            </>}
            endAction={<>
                {!first &&
                    <IconButton
                        icon="arrow_upward"
                        color="neutral"
                        size="sm"
                        variant="plain"
                        onClick={handleMoveUp}
                    />
                }

                {!last &&
                    <IconButton
                        icon="arrow_downward"
                        color="neutral"
                        size="sm"
                        variant="plain"
                        onClick={handleMoveDown}
                    />
                }

                {onDelete &&
                    <IconButton
                        icon="delete"
                        color="neutral"
                        size="sm"
                        variant="plain"
                        onClick={event => handleDelete(event, exercise)}
                    />
                }
            </>}
            selected={selected}
        />
    );
}