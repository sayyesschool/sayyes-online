import { useCallback } from 'react';

import MaterialsList from 'shared/components/materials-list';
import PageSection from 'shared/components/page-section';
import { IconButton, MenuButton } from 'shared/ui-components';

import { useActions, useStore } from 'crm/store';

export default function EnrollmentMaterials({ enrollment }) {
    const [materials = []] = useStore('materials.list');
    const actions = useActions('enrollments');

    const handleAddMaterial = useCallback((event, { value }) => {
        if (!value) return;

        return actions.updateEnrollment(enrollment.id, {
            materialIds: enrollment.materialIds.concat(value)
        });
    }, [enrollment, actions]);

    const handleRemoveMaterial = useCallback(materialId => {
        return actions.updateEnrollment(enrollment.id, {
            materialIds: enrollment.materialIds.filter(id => id !== materialId)
        });
    }, [enrollment, actions]);

    const enrollmentMaterials = materials
        .filter(material => enrollment.materialIds.includes(material.id));

    const items = materials
        .filter(material => !enrollment.materialIds.includes(material.id))
        .map(material => ({
            key: material.id,
            value: material.id,
            content: material.title
        }));

    return (
        <PageSection
            className="EnrollmentMaterials"
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