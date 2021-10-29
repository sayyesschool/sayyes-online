import { useCallback } from 'react';

import { useBoolean } from 'shared/hooks/state';
import FormDialog from 'shared/components/form-dialog';
import PageFAB from 'shared/components/page-fab';

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
            <div>
                {exercises?.map((exercise, index) =>
                    <ExerciseCard
                        key={exercise.id}
                        number={index + 1}
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
                fullscreen
                open={isFormOpen}
                onClose={setFormOpen}
            >
                <ExerciseForm
                    id="exercise-form"
                    course={course}
                    onSubmit={handleCreate}
                />
            </FormDialog>

            <PageFAB
                icon="add"
                exited={isFormOpen}
                onClick={setFormOpen}
            />
        </section>
    );
}