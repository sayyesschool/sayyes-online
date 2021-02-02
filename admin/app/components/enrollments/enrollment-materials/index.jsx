import React, { useCallback } from 'react';
import {
    Card,
    IconButton,
    List
} from 'mdc-react';

import MenuButton from 'shared/components/menu-button';

import { useStore, useActions } from 'app/hooks/store';

export default function EnrollmentMaterials({ enrollment }) {
    const [materials] = useStore('materials.list');
    const actions = useActions('enrollments');

    const handleAddMaterial = useCallback(materialId => {
        const materials = enrollment.materials.concat(materialId);

        actions.updateEnrollment(enrollment.id, { materials });
    }, [enrollment]);

    const handleRemoveMaterial = useCallback(materialId => {
        const materials = enrollment.materials.filter(material => material.id !== materialId);

        actions.updateEnrollment(enrollment.id, { materials });
    }, [enrollment]);

    const materialIds = materials?.map(material => material.id);
    const items = enrollment.materials
        .filter(material => !materialIds?.includes(material.id))
        .map(material => ({
            key: material.id,
            graphic: <img src={material.imageUrl} />,
            text: material.title,
            onClick: () => handleAddMaterial(material.id)
        }));

    return (
        <section className="enrollment-materials">
            <Card>
                <Card.Header
                    title="Пособия"
                    subtitle={enrollment.materials.length === 0 && 'Пособий нет'}
                    actions={
                        <MenuButton
                            icon="add"
                            disabled={items.length === 0}
                            items={items}
                        />
                    }
                />

                {enrollment.materials.length > 0 &&
                    <Card.Section>
                        <List imageList twoLine>
                            {enrollment.materials.map(material =>
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