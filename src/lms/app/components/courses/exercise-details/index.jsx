import PageSection from 'shared/components/page-section';

import ExerciseForm from 'app/components/courses/exercise-form';

export default function ExerciseDetails({ exercise, onUpdate }) {
    return (
        <PageSection
            className="exercise-details"
            title="Детали"
            description={`ID: ${exercise.id}`}
            actions={[{
                key: 'save',
                icon: 'save',
                title: 'Сохранить',
                form: 'exercise-form'
            }]}
        >
            <ExerciseForm
                id="exercise-form"
                exercise={exercise}
                onSubmit={onUpdate}
            />
        </PageSection>
    );
}