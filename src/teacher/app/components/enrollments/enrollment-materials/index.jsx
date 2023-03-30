import { useCallback } from 'react';

import MaterialsList from 'shared/components/materials-list';
import PageSection from 'shared/components/page-section';
import { IconButton, MenuButton, Spinner } from 'shared/ui-components';

import { useStore, useActions } from 'app/store/hooks';

export default function EnrollmentMaterials({ enrollment }) {
    const [materials] = useStore('materials.list');
    const enrollmentActions = useActions('enrollments');

    const handleAddMaterial = useCallback(materialId => {
        const materials = enrollment.materials.concat(materialId);

        return enrollmentActions.updateEnrollment(enrollment.id, { materials });
    }, [enrollment]);

    const handleRemoveMaterial = useCallback((event, materialId) => {
        event.preventDefault();
        event.stopPropagation();

        const materials = enrollment.materials.filter(id => id !== materialId);

        return enrollmentActions.updateEnrollment(enrollment.id, { materials });
    }, [enrollment]);

    const enrollmentMaterials = materials
        ?.filter(material => enrollment.materials.includes(material.id));

    const items = materials
        ?.filter(material => !enrollment.materials.includes(material.id))
        .map(material => ({
            key: material.id,
            media: <img src={material.imageUrl} />,
            content: material.title,
            onClick: () => handleAddMaterial(material.id)
        }));

    return (
        <PageSection
            className="enrollment-materials"
            title="Материалы"
            actions={materials ?
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
                :
                <Spinner size="sm" />
            }
            compact
        >
            {enrollmentMaterials.length > 0 &&
                <MaterialsList
                    materials={enrollment.materials}
                    onRemove={handleRemoveMaterial}
                />
            }
        </PageSection>
    );
}