import React from 'react';
import {
    Card,
    LayoutGrid,
    Typography
} from 'mdc-react';

import ExerciseDetails from '../exercise-details';

export default function LessonDetails({ lesson, onEditExercise, onDeleteExercise }) {
    return (
        <section className="lesson-details">
            <LayoutGrid>
                <LayoutGrid.Cell span="4">
                    <Typography variant="headline6">Детали</Typography>

                    <Card>
                        <Card.Header
                            title={lesson.title}
                            subtitle={lesson.slug}
                        />

                        {lesson.imageUrl &&
                            <Card.Media
                                imageUrl={lesson.imageUrl}
                                wide
                            />
                        }
                    </Card>
                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="4">
                    <Typography variant="headline6">Упражнения</Typography>

                    {lesson.exercises.map(exercise =>
                        <ExerciseDetails
                            key={exercise.id}
                            exercise={exercise}
                            onEdit={onEditExercise}
                            onDelete={onDeleteExercise}
                        />
                    )}
                </LayoutGrid.Cell>
            </LayoutGrid>
        </section>
    );
}