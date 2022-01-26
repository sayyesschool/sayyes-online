import { useCallback } from 'react';
import {
    IconButton,
    Card
} from 'mdc-react';
import classnames from 'classnames';

import { useBoolean } from 'shared/hooks/state';
import ExerciseContentPreview from 'shared/components/exercise-content';

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

export default function ExerciseContent({ course, exercise, onUpdate }) {
    const [isEditing, toggleEditing] = useBoolean(true);

    const handleSubmit = useCallback(data => {
        onUpdate(exercise.id, data);
    }, [exercise, onUpdate]);

    const classNames = classnames('exercise-content', `exercise-content--${exercise.type}`);

    return (
        <section className={classNames}>
            {isEditing ?
                <Card>
                    <Card.Header
                        title="Упражнение"
                        subtitle={`ID: ${exercise?.id}`}
                        actions={[
                            <IconButton
                                key="preview"
                                icon="preview"
                                onClick={toggleEditing}
                            />,
                            <IconButton
                                key="save"
                                type="submit"
                                form="exercise-form"
                                icon="save"
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
                :
                <Card className={classNames}>
                    <Card.Header
                        overline={exerciseTypes[exercise.type]}
                        title={exercise.title}
                        subtitle={exercise.description}
                        actions={[
                            <IconButton
                                key="close"
                                icon="close"
                                onClick={toggleEditing}
                            />
                        ]}
                    />

                    <Card.Section primary>
                        <ExerciseContentPreview
                            exercise={exercise}
                        />
                    </Card.Section>
                </Card>
            }
        </section>
    );
}