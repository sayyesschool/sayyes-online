import React, { useState, useEffect, useCallback } from 'react';

import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';

import { useStore, useActions } from 'app/hooks/store';
import FormPanel from 'app/components/shared/form-panel';
import EmptyState from 'app/components/shared/empty-state';
import RequestsTable from 'app/components/requests/requests-table';
import RequestForm from 'app/components/requests/request-form';
import RequestProcessFormDialog from 'app/components/requests/request-process-form-dialog';
import RequestSearchForm from 'app/components/requests/request-search-form';

import './index.scss';

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

    const handleProcessRequestSubmit = useCallback(data => {
        clientActions.createClient(data.client)
            .then(({ data: client }) => enrollmentActions.createEnrollment({
                ...data.enrollment,
                client: client.id,
                manager: user.id,
                request: request.id
            }))
            .then(({ data: enrollment }) => requestActions.updateRequest(request.id, {
                ...data.request,
                status: 'completed',
                client: enrollment.client,
                enrollment: enrollment.enrollment
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

    const handleSearch = useCallback(params => {
        console.log(params);
    }, []);

    const toggleSidePanel = useCallback(() => {
        setSidePanelOpen(value => !value);
    }, []);

    return (
        <Page id="requests-page">
            <FormPanel
                form="request-search-form"
                title="Поиск"
                open={isSidePanelOpen}
                submitButtonText="Найти"
                dismissible
                onClose={toggleSidePanel}
            >
                <RequestSearchForm
                    onSubmit={handleSearch}
                />
            </FormPanel>

            <div>
                <PageTopBar
                    title="Заявки"
                    actions={[
                        {
                            key: 'search',
                            icon: isSidePanelOpen ? 'search_off' : 'search',
                            onClick: toggleSidePanel
                        }
                    ]}
                />

                <PageContent>
                    {requests?.length > 0 ?
                        <RequestsTable
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
            </div>

            <RequestProcessFormDialog
                request={request}
                open={isRequestProcessPanelOpen}
                onSubmit={handleProcessRequestSubmit}
                onClose={() => setRequestProcessPanelOpen(false)}
            />

            <FormDialog
                title="Редактирование заявки"
                form="request-form"
                modal
                open={isRequestFormOpen}
                onClose={() => setRequestFormOpen(false)}
            >
                <RequestForm
                    request={request}
                    managers={managers}
                    onSubmit={handleUpdateRequest}
                />
            </FormDialog>

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