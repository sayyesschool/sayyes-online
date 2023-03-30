import PageSection from 'shared/components/page-section';

import UnitForm from 'app/components/courses/unit-form';

export default function UnitDetails({ unit, onUpdate }) {
    return (
        <PageSection
            className="sy-UnitDetails"
            title="Детали"
            actions={[{
                key: 'save',
                icon: 'save',
                title: 'Сохранить',
                type: 'submit',
                form: 'unit-form'
            }]}
        >
            <UnitForm
                id="unit-form"
                unit={unit}
                onSubmit={onUpdate}
            />
        </PageSection>
    );
}