import {
    Card
} from 'mdc-react';

import MaterialsList from 'shared/components/materials-list';

export default function EnrollmentMaterials({ enrollment }) {
    return (
        <section className="enrollment-materials">
            <Card>
                <Card.Header
                    title="Пособия"
                />

                {enrollment.materials.length > 0 &&
                    <Card.Section>
                        <MaterialsList
                            materials={enrollment.materials}
                        />
                    </Card.Section>
                }
            </Card>
        </section>
    );
};