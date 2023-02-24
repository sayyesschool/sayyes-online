import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';

import { Button, List } from 'shared/ui-components';

import './index.scss';

const types = {
    boolean: 'Да/Нет',
    choice: 'Выбор',
    essay: 'Эссе',
    fib: 'Заполнить пробелы',
    input: 'Ввод',
    text: 'Текст'
};

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
            media={index + 1}
            header={exercise.title}
            content={types[exercise.type]}
            endMedia={<>
                {!first &&
                    <Button
                        icon="arrow_upward"
                        text
                        onClick={handleMoveUp}
                    />
                }

                {!last &&
                    <Button
                        icon="arrow_downward"
                        text
                        onClick={handleMoveDown}
                    />
                }

                {onDelete &&
                    <Button
                        icon="delete"
                        text
                        onClick={event => handleDelete(event, exercise)}
                    />
                }
            </>}
            selected={selected}
        />
    );
}