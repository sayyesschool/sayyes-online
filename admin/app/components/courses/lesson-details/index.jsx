import React from 'react';
import {
    Card,
    Icon,
    IconButton,
    LayoutGrid
} from 'mdc-react';

import LessonForm from 'app/components/courses/lesson-form';
import ExerciseList from 'app/components/courses/exercise-list';
import ExerciseDetails from 'app/components/courses/exercise-details';

export default function LessonDetails({
    course,
    lesson,
    exercise,

    onUpdate,
    onAddExercise,
    onSelectExercise,
    onEditExercise,
    onDeleteExercise
}) {
    return (
        <section className="lesson-details">
            <LayoutGrid>
                <LayoutGrid.Cell span="6">
                    <Card>
                        <Card.Header
                            graphic={<Icon>article</Icon>}
                            title="Детали"
                            actions={
                                <IconButton
                                    icon="save"
                                    type="submit"
                                    form="lesson-form"
                                />
                            }
                        />

                        <Card.Section primary>
                            <LessonForm
                                course={course}
                                lesson={lesson}
                                onSubmit={onUpdate}
                            />
                        </Card.Section>
                    </Card>
                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="6">
                    <Card>
                        <Card.Header
                            graphic={<Icon>school</Icon>}
                            title="Упражнения"
                            actions={
                                <IconButton
                                    icon="add"
                                    onClick={onAddExercise}
                                />
                            }
                        />

                        {lesson.exercises.length > 0 &&
                            <Card.Section>
                                <ExerciseList
                                    exercise={exercise}
                                    exercises={lesson.exercises}
                                    onSelect={onSelectExercise}
                                    onDelete={onDeleteExercise}
                                />
                            </Card.Section>
                        }
                    </Card>
                </LayoutGrid.Cell>
            </LayoutGrid>
        </section>
    );
}