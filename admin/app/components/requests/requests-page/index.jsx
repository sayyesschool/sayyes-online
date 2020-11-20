import React, { useState, useEffect, useCallback } from 'react';

import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageSideSheet from 'shared/components/page-side-sheet';
import PageContent from 'shared/components/page-content';
import ConfirmationDialog from 'shared/components/confirmation-dialog';

import { useStore, useActions } from 'app/store';
import FormPanel from 'app/components/shared/form-panel';
import EmptyState from 'app/components/shared/empty-state';
import RequestTable from 'app/components/requests/request-table';
import RequestForm from 'app/components/requests/request-form';
import RequestProcessFormPanel from 'app/components/requests/request-process-form-panel';
import RequestSearchForm from 'app/components/requests/request-search-form';

export default function RequestsPage({ history }) {
    const [user] = useStore('user');
    const [managers] = useStore('managers.list');
    const [{ list: requests, single: request }, requestActions] = useStore('requests');
    const clientActions = useActions('clients');
    const enrollmentActions = useActions('enrollments');
    const { showNotification } = useActions('notification');

    const [isRequestProcessPanelOpen, setRequestProcessPanelOpen] = useState(false);
    const [isRequestFormOpen, setRequestFormOpen] = useState(false);
    const [isSidePanelOpen, setSidePanelOpen] = useState(false);
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [requestWithExistingClient, setRequestWithExistingClient] = useState();

    useEffect(() => {
        requestActions.getRequests();
    }, []);

    const handleUpdateRequest = useCallback(data => {
        requestActions.updateRequest(data.id, data)
            .then(() => setRequestFormOpen(false));
    }, []);

    const handleProcessRequest = useCallback(request => {
        if (!request.manager) {
            requestActions.updateRequest(request.id, { status: 'processing', manager: user.id })
                .then(() => setRequestProcessPanelOpen(true));
        } else if (request.manager.id === user.id) {
            setRequestProcessPanelOpen(true);
        } else {
            showNotification({ text: `Обработкой заявки уже занимается ${request.manager.fullname}` });
        }
    }, [user]);

    const handleCheckRequest = useCallback(request => {
        requestActions.getRequest(request.id)
            .then(({ data: request }) => {
                if (request.existingClient) {
                    setRequestWithExistingClient(request);
                } else {
                    handleProcessRequest(request);
                }
            });
    }, []);

    const handleProccessRequestSubmit = useCallback(data => {
        clientActions.createClient(data.client)
            .then(({ data }) => enrollmentActions.createEnrollment({
                ...data.enrollment,
                client: data.id,
                manager: user.id,
                request: request.id
            }))
            .then(({ data }) => requestActions.updateRequest(request.id, {
                ...data.request,
                status: 'completed',
                client: data.client,
                enrollment: data.enrollment
            }))
            .then(({ data }) => history.push(`/clients/${data.client.id}`));
    }, [request]);

    const handleExistingClient = useCallback(() => {
        requestActions.updateRequest(requestWithExistingClient.id, {
            status: 'completed',
            manager: user.id,
            client: requestWithExistingClient.existingClient.id
        }).then(({ data }) => {
            history.push(`/clients/${data.client.id}`);
            showNotification({ text: 'Заявка привязана к клиенту' });
        });
    }, [requestWithExistingClient]);

    const handleContinueProcessing = useCallback(() => {
        delete requestWithExistingClient.existingClient;
        handleProcessRequest(requestWithExistingClient);
        setRequestWithExistingClient(undefined);
    }, [requestWithExistingClient]);

    const handleEditRequest = useCallback(request => {
        requestActions.setRequest(request);
        setRequestFormOpen(true);
    }, []);

    const handleDeleteRequest = useCallback(() => {
        requestActions.deleteRequest(request.id)
            .then(() => {
                requestActions.unsetRequest();
                setConfirmationDialogOpen(false);
            });
    }, [request]);

    const handleDeleteConfirm = useCallback(request => {
        requestActions.setRequest(request);
        setConfirmationDialogOpen(true);
    }, []);

    const toggleSidePanel = useCallback(() => {
        setSidePanelOpen(value => !value);
    }, []);

    return (
        <Page id="requests" loading={!requests}>
            <PageHeader
                title="Заявки"
                actions={[
                    {
                        key: 'search',
                        icon: 'search',
                        onClick: toggleSidePanel
                    }
                ]}
            />

            <PageSideSheet
                title="Поиск"
                open={isSidePanelOpen}
                dismissible
                onClose={toggleSidePanel}
            >
                <RequestSearchForm />
            </PageSideSheet>

            <PageContent>
                {requests?.length > 0 ?
                    <RequestTable
                        requests={requests}
                        manager={user}
                        onEdit={handleEditRequest}
                        onProcess={handleCheckRequest}
                        onDelete={handleDeleteConfirm}
                    />
                    :
                    <EmptyState title="Заявок пока нет" />
                }
            </PageContent>

            <RequestProcessFormPanel
                request={request}
                open={isRequestProcessPanelOpen}
                onSubmit={handleProccessRequestSubmit}
                onClose={() => setRequestProcessPanelOpen(false)}
            />

            <FormPanel
                title="Редактирование заявки"
                form="request-form"
                open={isRequestFormOpen}
                onClose={() => setRequestFormOpen(false)}
            >
                <RequestForm
                    request={request}
                    managers={managers}
                    onSubmit={handleUpdateRequest}
                />
            </FormPanel>

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите удалить заявку?"
                open={isConfirmationDialogOpen}
                onConfirm={handleDeleteRequest}
                onClose={() => setConfirmationDialogOpen(false)}
            />

            <ConfirmationDialog
                title="Совпадение номера телефона"
                message={`Номер телефона в заявке совпадает с номером телефона существующего клиента ${requestWithExistingClient?.existingClient.fullname} (${requestWithExistingClient?.existingClient.phone}). Вы хотите привязать заявку к нему?`}
                open={Boolean(requestWithExistingClient)}
                onConfirm={handleExistingClient}
                onClose={handleContinueProcessing}
            />
        </Page>
    );
}