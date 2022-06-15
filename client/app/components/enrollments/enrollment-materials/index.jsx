import MaterialsList from 'shared/components/materials-list';
import PageSection from 'shared/components/page-section';

export default function EnrollmentMaterials({ enrollment }) {
    return (
        <PageSection className="enrollment-materials" title="Пособия">
            {enrollment.materials.length > 0 &&
                <MaterialsList
                    materials={enrollment.materials}
                />
            }
        </PageSection>
    );
};