import { useCallback } from 'react';
import { Button, List, MenuButton } from '@fluentui/react-northstar';

import Icon from 'shared/components/icon';
import PageSection from 'shared/components/page-section';

import { useStore, useActions } from 'app/hooks/store';

export default function EnrollmentMaterials({ enrollment }) {
    const [materials = []] = useStore('materials.list');
    const enrollmentActions = useActions('enrollments');

    const handleAddMaterial = useCallback((event, component) => {
        const materialId = component.value;
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
            value: material.id,
            content: material.title
        }));

    return (
        <PageSection
            className="enrollment-materials"
            title="Пособия"
            actions={
                <MenuButton
                    trigger={
                        <Button
                            icon={<Icon>add</Icon>}
                            text
                            iconOnly
                        />
                    }
                    align="end"
                    menu={items}
                    onMenuItemClick={handleAddMaterial}
                />
            }
        >
            {enrollmentMaterials.length > 0 &&
                <List>
                    {enrollmentMaterials.map(material =>
                        <List.Item
                            key={material.id}
                            media={<img src={material.imageUrl} />}
                            header={material.title}
                            content={material.subtitle}
                            endMedia={
                                <Button
                                    title="Убрать материал"
                                    icon={<Icon>remove</Icon>}
                                    iconOnly
                                    text
                                    onClick={() => handleRemoveMaterial(material.id)}
                                />
                            }
                        />
                    )}
                </List>
            }
        </PageSection>
    );
}