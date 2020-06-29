import React from 'react';

import Page from 'app/components/shared/page';
import PageHeader from 'app/components/shared/page-header';
import PageContent from 'app/components/shared/page-content';

import './index.scss';

export default function HomePage() {
    return (
        <Page id="home">
            <PageHeader
                title="Главная"
            />

            <PageContent>

            </PageContent>
        </Page>
    );
}