import {
    Card,
    IconButton
} from 'mdc-react';

import UnitForm from 'app/components/courses/unit-form';

export default function UnitDetails({ unit, onUpdate }) {
    return (
        <section className="unit-details">
            <Card>
                <Card.Header
                    title="Детали"
                    actions={[
                        <IconButton
                            icon="save"
                            type="submit"
                            form="unit-form"
                        />
                    ]}
                />

                <Card.Section primary>
                    <UnitForm
                        id="unit-form"
                        unit={unit}
                        onSubmit={onUpdate}
                    />
                </Card.Section>
            </Card>
        </section>
    );
}