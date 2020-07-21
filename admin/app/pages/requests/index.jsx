import React, { useState, useEffect, useCallback } from 'react';

import { useStore } from 'app/store';
import Page from 'app/components/shared/page';
import PageHeader from 'app/components/shared/page-header';
import PageContent from 'app/components/shared/page-content';
import ConfirmationDialog from 'app/components/shared/confirmation-dialog';
import FormPanel from 'app/components/shared/form-panel';
import RequestList from 'app/components/requests/request-list';
import RequestForm from 'app/components/requests/request-form';
import ClientForm from 'app/components/clients/client-form';

export default function Requests() {
    const [request, setRequest] = useState();
    const [isRequestFormOpen, setRequestFormOpen] = useState(false);
    const [isClientFormOpen, setClientFormOpen] = useState(false);
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [{ list: requests }, actions] = useStore('requests');

    useEffect(() => {
        actions.getRequests();
    }, []);

    const handleRequestSubmit = useCallback(data => {
        (data.id ?
            actions.updateRequest(data.id, data) :
            actions.createRequest(data)
        ).then(() => setRequestFormOpen(false));
    }, []);

    const handleClientSubmit = useCallback(data => {
        actions.createClient(data)
            .then(() => setClientFormOpen(false));
    }, []);

    const handleEdit = useCallback(request => {
        setRequest(request);
        setRequestFormOpen(true);
    }, []);

    const handleTransformToClient = useCallback(request => {
        setRequest(request);
        setClientFormOpen(true);
    }, []);

    const handleDelete = useCallback(request => {
        setRequest(request);
        setConfirmationDialogOpen(true);
    }, []);

    const deleteRequest = useCallback(() => {
        actions.deleteRequest(request.id)
            .then(() => {
                setRequest();
                setConfirmationDialogOpen(false);
            });
    }, [request]);

    return (
        <Page id="requests">
            <PageHeader
                title="Заявки"
                controls={[
                    {
                        key: 'add',
                        label: 'Создать',
                        icon: 'add',
                        iconProps: { iconName: 'Add' },
                        onClick: () => setRequestFormOpen(true)
                    }
                ]}
            />

            <PageContent loading={!requests}>
                <RequestList
                    requests={requests}
                    onEdit={handleEdit}
                    onTransformToClient={handleTransformToClient}
                    onDelete={handleDelete}
                />
            </PageContent>

            <FormPanel
                title={request?.id ? 'Редактирование заявки' : 'Новая заявка'}
                form="request-form"
                open={isRequestFormOpen}
                onDismiss={() => setRequestFormOpen(false)}
            >
                <RequestForm
                    request={request}
                    onSubmit={handleRequestSubmit}
                />
            </FormPanel>

            <FormPanel
                headerText="Новый клиент"
                form="client-form"
                isOpen={isClientFormOpen}
                onDismiss={() => setClientFormOpen(false)}
            >
                <ClientForm
                    client={request?.contact}
                    onSubmit={handleClientSubmit}
                />
            </FormPanel>

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите удалить заявку?"
                isOpen={isConfirmationDialogOpen}
                onConfirm={deleteRequest}
                onClose={() => setConfirmationDialogOpen(false)}
            />
        </Page>
    );
}