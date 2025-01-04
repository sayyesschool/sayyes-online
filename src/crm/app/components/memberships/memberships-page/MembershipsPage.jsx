import { useState } from 'react';

import Page from 'shared/components/page';
import { useMemberships } from 'shared/hooks/memberships';
import { Tabs } from 'shared/ui-components';

import MembershipsTable from 'crm/components/memberships/memberships-table';

export default function MembershipsPage() {
    const [memberships] = useMemberships();

    const [tab, setTab] = useState('active');

    const filteredMemberships = memberships?.filter(filters[tab]);

    return (
        <Page id="memberships" loading={!memberships}>
            <Page.Header
                title="Абонементы"
            />

            <Page.Content>
                <Tabs
                    value={tab}
                    items={[
                        { key: 'active', value: 'active', content: 'Активные' },
                        { key: 'expired', value: 'expired', content: 'Истекшие' },
                        { key: 'all', value: 'all', content: 'Все' }
                    ]}
                    onChange={(_, value) => setTab(value)}
                />

                <Page.Section variant="outlined" compact>
                    <MembershipsTable
                        memberships={filteredMemberships}
                    />
                </Page.Section>
            </Page.Content>
        </Page>
    );
}

const filters = {
    active: membership => membership.isActive,
    expired: membership => membership.isExpired,
    all: () => true
};