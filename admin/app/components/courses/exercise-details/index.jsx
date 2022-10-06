import Button from 'shared/ui-components/button';
import PageSection from 'shared/components/page-section';

import ExerciseForm from 'app/components/courses/exercise-form';

export default function ExerciseDetails({ exercise, onUpdate }) {
    return (
        <PageSection
            className="exercise-details"
            title="Детали"
            description={`ID: ${exercise.id}`}
            actions={
                <Button
                    type="submit"
                    form="exercise-form"
                    icon="save"
                    text
                />
            }
        >
            <ExerciseForm
                id="exercise-form"
                exercise={exercise}
                onSubmit={onUpdate}
            />
        </PageSection>
    );
}