import { Button } from '@fluentui/react-northstar';

import Icon from 'shared/components/material-icon';
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
                    icon={<Icon>save</Icon>}
                    iconOnly
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