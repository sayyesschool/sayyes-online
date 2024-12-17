import { useEffect, useState } from 'react';

import Page from 'shared/components/page';
import { Tabs } from 'shared/ui-components';

import TicketsTable from 'crm/components/memberships/memberships-table';
import { useStore } from 'crm/store';

export default function TicketsPage() {
    const [tickets, actions] = useStore('tickets.list');

    const [tab, setTab] = useState('valid');

    useEffect(() => {
        actions.getTickets();
    }, [actions]);

    const filteredTickets = tickets?.filter(filters[tab]);

    return (
        <Page id="payments" loading={!tickets}>
            <Page.Header
                title="Билеты"
            />

            <Page.Content>
                <Tabs
                    value={tab}
                    items={[
                        { key: 'valid', value: 'valid', content: 'Активные' },
                        { key: 'expired', value: 'expired', content: 'Истекшие' },
                        { key: 'all', value: 'all', content: 'Все' }
                    ]}
                    onChange={(_, value) => setTab(value)}
                />

                <Page.Section variant="outlined" compact>
                    <TicketsTable
                        tickets={filteredTickets}
                    />
                </Page.Section>
            </Page.Content>
        </Page>
    );
}

const filters = {
    valid: ticket => ticket.isValid,
    expired: ticket => ticket.isExpired,
    all: () => true
};