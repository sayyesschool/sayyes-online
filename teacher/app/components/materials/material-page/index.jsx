import React from 'react';

import { useMaterial } from 'shared/hooks/materials';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import MaterialContent from 'app/components/materials/material-content';

import './index.scss';

export default function MaterialPage({ match }) {
    const [material, actions] = useMaterial(match.params.slug);

    if (!material) return <LoadingIndicator />;

    return (
        <Page id="material-page">
            <PageContent>
                <MaterialContent
                    material={material}
                />
            </PageContent>
        </Page>
    );
}