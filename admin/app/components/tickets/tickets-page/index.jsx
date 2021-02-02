import React, { useState, useEffect } from 'react';

import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/hooks/store';
import TicketList from 'app/components/tickets/ticket-list';

export default function Tickets() {
    const [tickets, actions] = useStore('tickets.list');

    const [isTicketFormOpen, setTicketFormOpen] = useState(false);

    useEffect(() => {
        actions.getTickets();
    }, []);

    return (
        <Page id="meetings" loading={!tickets}>
            <PageHeader
                title="Билеты"
            />

            <PageContent>
                <TicketList
                    tickets={tickets}
                />
            </PageContent>
        </Page>
    );
}