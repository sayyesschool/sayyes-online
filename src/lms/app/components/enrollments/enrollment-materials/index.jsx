import { useCallback } from 'react';

import { useMaterials } from 'shared/hooks/materials';
import MaterialsList from 'shared/components/materials-list';
import PageSection from 'shared/components/page-section';
import { IconButton, MenuButton } from 'shared/ui-components';

import { useActions } from 'app/store/hooks';

export default function EnrollmentMaterials({ enrollment, readonly }) {
    const [materials] = useMaterials();
    const enrollmentActions = useActions('enrollments');

    const handleAddMaterial = useCallback(materialId => {
        const materials = enrollment.materialIds.concat(materialId);

        return enrollmentActions.updateEnrollment(enrollment.id, { materials });
    }, [enrollment]);

    const handleRemoveMaterial = useCallback((event, materialId) => {
        event.preventDefault();
        event.stopPropagation();

        const materials = enrollment.materials.filter(id => id !== materialId);

        return enrollmentActions.updateEnrollment(enrollment.id, { materials });
    }, [enrollment]);

    const items = materials
        ?.filter(material => !enrollment.materialIds.includes(material.id))
        .map(material => ({
            key: material.id,
            media: <img src={material.imageUrl} />,
            content: material.title,
            onClick: () => handleAddMaterial(material.id)
        }));

    return (
        <PageSection
            className="EnrollmentMaterials"
            title="Материалы"
            actions={!readonly &&
                <MenuButton
                    trigger={
                        <IconButton
                            icon="add"
                            title="Добавить материал"
                            size="sm"
                        />
                    }
                    items={items}
                />
            }
            compact
        >
            {enrollment.materials?.length > 0 &&
                <MaterialsList
                    materials={enrollment.materials}
                    onRemove={!readonly && handleRemoveMaterial}
                />
            }
        </PageSection>
    );
}