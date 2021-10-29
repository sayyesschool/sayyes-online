import { useCallback } from 'react';
import {
    Avatar,
    IconButton,
    Card
} from 'mdc-react';
import classnames from 'classnames';

import { useBoolean } from 'shared/hooks/state';
import ExerciseContent from 'shared/components/exercise-content';

import ExerciseForm from 'app/components/courses/exercise-form';

import './index.scss';

export default function ExerciseCard({ course, exercise, number, onUpdate, onDelete }) {
    const [isCollapsed, toggleCollapsed] = useBoolean(true);
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
                <Card.PrimaryAction onClick={toggleCollapsed}>
                    <Card.Header
                        title="Редактирование упражнения"
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
                </Card.PrimaryAction>

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
                <Card.PrimaryAction onClick={toggleCollapsed}>
                    <Card.Header
                        graphic={
                            <Avatar text={number} size="medium" />
                        }
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
                            />,

                            <IconButton
                                key="toggle"
                                icon={isCollapsed ? 'expand_more' : 'expand_less'}
                            />
                        ]}
                    />
                </Card.PrimaryAction>

                {!isCollapsed &&
                    <Card.Section primary>
                        <ExerciseContent
                            exercise={exercise}
                        />
                    </Card.Section>
                }
            </Card>
        );
}