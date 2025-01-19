import { useCallback, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useMemberships } from 'shared/hooks/memberships';
import { Tabs } from 'shared/ui-components';

import MembershipForm from 'crm/components/memberships/membership-form';
import MembershipsTable from 'crm/components/memberships/memberships-table';

export default function MembershipsPage() {
    const [memberships, actions] = useMemberships();

    const [tab, setTab] = useState('active');
    const [membership, setMembership] = useState();
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleSubmit = useCallback(data => {
        return actions.createMembership(data)
            .then(() => setDialogOpen(false));
    }, [actions]);

    const handleUpdate = useCallback(data => {
        return actions.updateMembership(membership.id, data)
            .then(() => setDialogOpen(false));
    }, [membership, actions]);

    const handleDelete = useCallback(() => {
        return actions.deleteMembership(membership.id);
    }, [membership, actions]);

    const handleCreate = useCallback(() => {
        setMembership();
        setDialogOpen(true);
    }, []);

    const handleEdit = useCallback(membership => {
        setMembership(membership);
        setDialogOpen(true);
    }, []);

    const handleDialogClose = useCallback(() => {
        setMembership();
        setDialogOpen(false);
    }, []);

    const filteredMemberships = memberships?.filter(filters[tab]);

    if (!filteredMemberships) return <LoadingIndicator />;

    return (
        <Page id="memberships">
            <Page.Header
                title="Абонементы"
                actions={[{
                    key: 'add',
                    icon: 'add',
                    content: 'Создать абонемент',
                    variant: 'solid',
                    onClick: handleCreate
                }]}
            />

            <Page.Content>
                <Tabs
                    value={tab}
                    items={[
                        { key: 'active', value: 'active', content: 'Активные' },
                        { key: 'inactive', value: 'inactive', content: 'Неактивные' },
                        { key: 'all', value: 'all', content: 'Все' }
                    ]}
                    onChange={(_, value) => setTab(value)}
                />

                <Page.Section variant="outlined" compact>
                    <MembershipsTable
                        memberships={filteredMemberships}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </Page.Section>
            </Page.Content>

            <FormDialog
                title={membership?.id ? 'Изменить абонемент' : 'Новый абонемент'}
                form="membership-form"
                open={isDialogOpen}
                onClose={handleDialogClose}
            >
                <MembershipForm
                    membership={membership}
                    onSubmit={membership?.id ? handleUpdate : handleSubmit}
                />
            </FormDialog>
        </Page>
    );
}

const filters = {
    active: membership => membership.isActive,
    inactive: membership => !membership.isActive,
    all: () => true
};