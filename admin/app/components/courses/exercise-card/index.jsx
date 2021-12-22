import { useCallback } from 'react';
import {
    IconButton,
    Card
} from 'mdc-react';
import classnames from 'classnames';

import { useBoolean } from 'shared/hooks/state';
import ExerciseContent from 'shared/components/exercise-content';

import ExerciseForm from 'app/components/courses/exercise-form';

import './index.scss';

const exerciseTypes = {
    boolean: 'Да / Нет',
    choice: 'Выбор',
    essay: 'Эссе',
    fib: 'Заполнить пробелы',
    input: 'Ввод',
    text: 'Текст'
};

export default function ExerciseCard({ course, exercise, onUpdate, onDelete }) {
    const [isEditing, toggleEditing] = useBoolean(false);
    const [isDeleting, toggleDeleting] = useBoolean(false);

    const handleSubmit = useCallback(data => {
        onUpdate(exercise.id, data).then(() => toggleEditing(false));
    }, [exercise, onUpdate]);

    const handleDelete = useCallback(event => {
        event.stopPropagation();

        toggleDeleting(true);
        onDelete(exercise.id);
    }, [exercise, onDelete]);

    const classNames = classnames('exercise-card', `exercise-card--${exercise.type}`);

    return isEditing ?
        (
            <Card className={classNames}>
                <Card.Header
                    title="Редактирование упражнения"
                    subtitle={`ID: ${exercise?.id}`}
                    actions={[
                        <IconButton
                            key="save"
                            type="submit"
                            form="exercise-form"
                            icon="save"
                        />,

                        <IconButton
                            key="close"
                            icon="close"
                            onClick={toggleEditing}
                        />
                    ]}
                />

                <Card.Section primary>
                    <ExerciseForm
                        id="exercise-form"
                        course={course}
                        exercise={exercise}
                        onSubmit={handleSubmit}
                    />
                </Card.Section>
            </Card>
        )
        :
        (
            <Card className={classNames}>
                <Card.Header
                    overline={exerciseTypes[exercise.type]}
                    title={exercise.title}
                    subtitle={exercise.description}
                    actions={[
                        <IconButton
                            key="edit"
                            icon="edit"
                            disabled={isDeleting}
                            onClick={toggleEditing}
                        />,

                        <IconButton
                            key="delete"
                            icon="delete"
                            disabled={isDeleting}
                            onClick={handleDelete}
                        />
                    ]}
                />

                <Card.Section primary>
                    <ExerciseContent
                        exercise={exercise}
                    />
                </Card.Section>
            </Card>
        );
}