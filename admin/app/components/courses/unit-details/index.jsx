import {
    Card,
    Icon,
    IconButton
} from 'mdc-react';

import UnitForm from 'app/components/courses/unit-form';

export default function UnitDetails({ unit, onUpdate }) {
    return (
        <section className="unit-details">
            <Card>
                <Card.Header
                    graphic={<Icon>article</Icon>}
                    title="Детали"
                    actions={
                        <IconButton
                            icon="save"
                            type="submit"
                            form="unit-form"
                        />
                    }
                />

                <Card.Section primary>
                    <UnitForm
                        unit={unit}
                        onSubmit={onUpdate}
                    />
                </Card.Section>
            </Card>
        </section>
    );
}