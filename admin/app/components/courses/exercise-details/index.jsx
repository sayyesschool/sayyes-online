import { useCallback } from 'react';
import {
    IconButton,
    Card
} from 'mdc-react';

import ExerciseForm from 'app/components/courses/exercise-form';

export default function ExerciseCard({ course, exercise, onUpdate, onDelete }) {
    const handleSubmit = useCallback(data => {
        onUpdate(exercise.id, data).then(() => toggleEditing(false));
    }, [exercise, onUpdate]);

    return (
        <section className="exercise-details">
            <Card>
                <Card.Header
                    title="Детали"
                    subtitle={`ID: ${exercise?.id}`}
                    actions={[
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
        </section>
    );
}