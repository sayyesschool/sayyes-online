import React, { useCallback } from 'react';
import {
    Card,
    Icon,
    IconButton,
    List
} from 'mdc-react';

import MenuButton from 'shared/components/menu-button';

import { useStore, useActions } from 'app/hooks/store';

export default function EnrollmentMaterials({ enrollment }) {
    const [materials = []] = useStore('materials.list');
    const enrollmentActions = useActions('enrollments');

    const handleAddMaterial = useCallback(materialId => {
        const materials = enrollment.materials.concat(materialId);

        return enrollmentActions.updateEnrollment(enrollment.id, { materials });
    }, [enrollment]);

    const handleRemoveMaterial = useCallback(materialId => {
        const materials = enrollment.materials.filter(id => id !== materialId);

        return enrollmentActions.updateEnrollment(enrollment.id, { materials });
    }, [enrollment]);

    const enrollmentMaterials = materials
        .filter(material => enrollment.materials.includes(material.id));

    const items = materials
        .filter(material => !enrollment.materials.includes(material.id))
        .map(material => ({
            key: material.id,
            graphic: <img src={material.imageUrl} />,
            primaryText: material.title,
            secondaryText: material.subtitle,
            onClick: () => handleAddMaterial(material.id)
        }));

    return (
        <section className="enrollment-materials">
            <Card>
                <Card.Header
                    graphic={<Icon>book</Icon>}
                    title="Пособия"
                    actions={
                        <MenuButton
                            icon="add"
                            listProps={{ twoLine: true }}
                            items={items}
                        />
                    }
                />

                {enrollmentMaterials.length > 0 &&
                    <Card.Section>
                        <List imageList twoLine>
                            {enrollmentMaterials.map(material =>
                                <List.Item
                                    key={material.id}
                                    graphic={<img src={material.imageUrl} />}
                                    primaryText={material.title}
                                    secondaryText={material.subtitle}
                                    meta={
                                        <IconButton
                                            icon="remove"
                                            title="Убрать курс"
                                            onClick={() => handleRemoveMaterial(material.id)}
                                        />
                                    }
                                />
                            )}
                        </List>
                    </Card.Section>
                }
            </Card>
        </section>
    );
}