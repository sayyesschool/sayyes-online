import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useEnrollment } from 'shared/hooks/enrollment';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

export default function MaterialPage({ match }) {
    const [enrollment] = useEnrollment(match.params.enrollmentId);

    const [material, setMaterial] = useState();

    if (!material) return <LoadingIndicator />;

    return (
        <Page id="material-page">
            <PageHeader
                title={material.title}
            />

            <PageContent>

            </PageContent>
        </Page>
    );
}