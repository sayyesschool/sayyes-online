import DetailsList from 'shared/components/details-list';
import PageSection from 'shared/components/page-section';

import MaterialForm from 'app/components/materials/material-form';

export default function MaterialDetails({ material, onUpdate }) {
    return (
        <PageSection
            className="material-details"
            title="Детали"
        >
            <MaterialForm
                material={material}
                onSubmit={onUpdate}
            />
        </PageSection>
    );
}