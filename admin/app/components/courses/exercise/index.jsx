import React, { useState, useCallback } from 'react';
import {
    IconButton,
    Card
} from 'mdc-react';

import ExerciseDetails from 'app/components/courses/exercise-details';
import ExerciseForm from 'app/components/courses/exercise-form';

export default function Exercise({ course, exercise, onUpdate, onDelete }) {
    const [isExerciseFormOpen, setExerciseFormOpen] = useState(false);

    const handleSubmit = useCallback(data => {
        onUpdate(data).then(() => setExerciseFormOpen(false));
    }, []);

    const toggleExerciseForm = useCallback(() => {
        setExerciseFormOpen(value => !value);
    }, []);

    return isExerciseFormOpen ?
        (
            <Card>
                <Card.Header
                    title={exercise.description}
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
                            onClick={toggleExerciseForm}
                        />
                    ]}
                />

                <Card.Section primary>
                    <ExerciseForm
                        course={course}
                        exercise={exercise}
                        onSubmit={handleSubmit}
                    />
                </Card.Section>
            </Card>
        )
        :
        (
            <ExerciseDetails
                exercise={exercise}
                onEdit={toggleExerciseForm}
                onDelete={onDelete}
            />
        );
}