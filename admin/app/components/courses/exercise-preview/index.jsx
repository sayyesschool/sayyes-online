import PageSection from 'shared/components/page-section';
import ExerciseContent from 'shared/components/exercise-content';

import './index.scss';

export default function ExercisePreview({ exercise }) {
    return (
        <PageSection
            className="exercise-preview"
            title={exercise.title}
            description={exercise.description}
        >
            <ExerciseContent
                exercise={exercise}
            />
        </PageSection>
    );
}