import React from 'react';

import { useMaterials } from 'shared/hooks/materials';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import MaterialGrid from 'shared/components/material-grid';

export default function MaterialsPage({ match, location }) {
    const [materials, actions] = useMaterials(location.search);

    if (!materials) return <LoadingIndicator />;

    return (
        <Page id="materials-page">
            <PageHeader>
                Поиск
            </PageHeader>

            <PageContent>
                <MaterialGrid materials={materials} />
            </PageContent>
        </Page>
    );
}