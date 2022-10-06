import Button from 'shared/ui-components/button';
import PageSection from 'shared/components/page-section';

import UnitForm from 'app/components/courses/unit-form';

export default function UnitDetails({ unit, onUpdate }) {
    return (
        <PageSection
            className="unit-details"
            title="Детали"
            actions={
                <Button
                    type="submit"
                    form="unit-form"
                    icon="save"
                    text
                />
            }
        >
            <UnitForm
                id="unit-form"
                unit={unit}
                onSubmit={onUpdate}
            />
        </PageSection>
    );
}