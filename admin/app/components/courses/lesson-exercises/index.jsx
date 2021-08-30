import React, { useCallback } from 'react';
import {
    Card,
    IconButton
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import FormDialog from 'shared/components/form-dialog';

import ExerciseCard from 'app/components/courses/exercise-card';
import ExerciseForm from 'app/components/courses/exercise-form';

import './index.scss';

export default function LessonExercises({
    course,
    lesson,

    onCreate,
    onUpdate,
    onDelete
}) {
    const [isFormOpen, setFormOpen] = useBoolean(false);

    const handleCreate = useCallback(data => {
        onCreate(data).then(() => setFormOpen(false));
    }, []);

    const exercises = lesson.exercises.map(id => course.exercisesById.get(id));

    return (
        <section className="lesson-exercises">
            <Card>
                <Card.Header
                    title="Упражнения"
                    actions={
                        <IconButton
                            icon="add"
                            onClick={setFormOpen}
                        />
                    }
                />

                {exercises.length > 0 &&
                    <Card.Section primary>
                        {exercises?.map(exercise =>
                            <ExerciseCard
                                key={exercise.id}
                                course={course}
                                exercise={exercise}
                                onUpdate={onUpdate}
                                onDelete={onDelete}
                            />
                        )}
                    </Card.Section>
                }
            </Card>

            <FormDialog
                title="Новое упражнение"
                form="exercise-form"
                open={isFormOpen}
                onClose={setFormOpen}
            >
                <ExerciseForm
                    id="exercise-form"
                    course={course}
                    onSubmit={handleCreate}
                />
            </FormDialog>
        </section>
    );
}