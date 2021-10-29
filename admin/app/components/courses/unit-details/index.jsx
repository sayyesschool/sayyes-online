import PageFAB from 'shared/components/page-fab';

import UnitForm from 'app/components/courses/unit-form';

export default function UnitDetails({ unit, onUpdate }) {
    return (
        <section className="unit-details">
            <UnitForm
                unit={unit}
                onSubmit={onUpdate}
            />

            <PageFAB
                icon="save"
                type="submit"
                form="unit-form"
            />
        </section>
    );
}