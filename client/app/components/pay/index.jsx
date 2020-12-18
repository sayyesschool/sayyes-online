import React, { useState } from 'react';
import {
    Card,
    Icon,
    Layout,
    LayoutGrid,
    SegmentedButton,
    Typography
} from 'mdc-react';

import { useSelector } from 'shared/hooks/store';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

export default function PayPage() {
    const user = useSelector(store => store.user);
    const enrollments = useSelector(store => store.enrollments);

    return (
        <Page id="pay-page">
            <PageHeader
                title="Оплата обучения"
            />

            <PageContent>

            </PageContent>
        </Page>
    );
}