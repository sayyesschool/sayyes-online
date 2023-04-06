import { useCallback } from 'react';

import MaterialsList from 'shared/components/materials-list';
import PageSection from 'shared/components/page-section';
import { IconButton, MenuButton } from 'shared/ui-components';

import { useStore, useActions } from 'app/store';

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
            className="sy-EnrollmentMaterials"
            title="Пособия"
            actions={
                <MenuButton
                    trigger={
                        <IconButton
                            icon="add"
                            color="neutral"
                            size="sm"
                            variant="plain"
                        />
                    }
                    items={items}
                    onMenuItemClick={handleAddMaterial}
                />
            }
            compact
        >
            {enrollmentMaterials.length > 0 &&
                <MaterialsList
                    materials={enrollmentMaterials}
                    onRemove={handleRemoveMaterial}
                />
            }
        </PageSection>
    );
}