import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Button,
    List
} from '@fluentui/react-northstar';

import Icon from 'shared/components/material-icon';

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
    onDelete
}) {
    const handleClick = useCallback((event, exercise) => {
        event.preventDefault();
        event.stopPropagation();

        onDelete(exercise);
    }, []);

    return (
        <List className="exercises-list numbered-list" selectable>
            {exercises.map((exercise, index) =>
                <List.Item
                    key={exercise.id}
                    as={NavLink}
                    to={exercise.uri}
                    media={index + 1}
                    header={exercise.title}
                    content={types[exercise.type]}
                    endMedia={onDelete &&
                        <Button
                            icon={<Icon>delete</Icon>}
                            iconOnly
                            text
                            onClick={event => handleClick(event, exercise)}
                        />
                    }
                    selected={exercise.id === selectedExercise?.id}
                />
            )}
        </List>
    );
}