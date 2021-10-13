import React, { useCallback } from 'react';
import {
    IconButton,
    Layout,
    Typography
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
        return onCreate(data).then(() => setFormOpen(false));
    }, []);

    const exercises = lesson.exercises.map(id => course.exercisesById.get(id));

    return (
        <section className="lesson-exercises">
            <header>
                <Typography type="headline6" noMargin>Упражнения</Typography>

                <IconButton
                    icon="add"
                    onClick={setFormOpen}
                />
            </header>

            <div>
                {exercises?.map(exercise =>
                    <ExerciseCard
                        key={exercise.id}
                        course={course}
                        exercise={exercise}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                )}
            </div>

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