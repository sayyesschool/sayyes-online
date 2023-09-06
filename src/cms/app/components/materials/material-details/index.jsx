import DetailsList from 'shared/components/details-list';
import PageSection from 'shared/components/page-section';

import MaterialForm from 'app/components/materials/material-form';

export default function MaterialDetails({ material, onUpdate }) {
    return (
        <PageSection
            className="MaterialDetails"
            title="Детали"
        >
            <MaterialForm
                material={material}
                onSubmit={onUpdate}
            />
        </PageSection>
    );
}