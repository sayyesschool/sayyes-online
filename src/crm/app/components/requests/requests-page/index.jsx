import { useCallback, useEffect, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';

import { useStore, useActions } from 'app/store';
import RequestsTable from 'app/components/requests/requests-table';
import RequestForm from 'app/components/requests/request-form';
import RequestProcessFormDialog from 'app/components/requests/request-process-form-dialog';
import RequestSearchForm from 'app/components/requests/request-search-form';

export default function RequestsPage({ history }) {
    const [user] = useStore('user');
    const [managers] = useStore('managers.list');
    const [{ list: requests, single: request }, requestActions] = useStore('requests');

    const clientActions = useActions('clients');
    const enrollmentActions = useActions('enrollments');
    const { showNotification } = useActions('notification');

    const [isRequestProcessPanelOpen, toggleRequestProcessPanelOpen] = useBoolean(false);
    const [isRequestFormOpen, toggleRequestFormOpen] = useBoolean(false);
    const [isSearchFormOpen, toggleSearchFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);
    const [requestWithExistingClient, setRequestWithExistingClient] = useState();

    useEffect(() => {
        requestActions.getRequests();
    }, []);

    const handleUpdateRequest = useCallback(data => {
        return requestActions.updateRequest(data.id, data)
            .then(() => toggleRequestFormOpen(false));
    }, []);

    const handleProcessRequest = useCallback(request => {
        if (!request.manager) {
            requestActions.updateRequest(request.id, { status: 'processing', manager: user.id })
                .then(() => toggleRequestProcessPanelOpen(true));
        } else if (request.manager.id === user.id) {
            toggleRequestProcessPanelOpen(true);
        } else {
            showNotification({ text: `Обработкой заявки уже занимается ${request.manager.fullname}` });
        }
    }, [user]);

    const handleCheckRequest = useCallback(request => {
        return requestActions.getRequest(request.id)
            .then(({ data: request }) => {
                if (request.existingClient) {
                    setRequestWithExistingClient(request);
                } else {
                    handleProcessRequest(request);
                }
            });
    }, []);

    const handleProcessRequestSubmit = useCallback(data => {
        return clientActions.createClient(data.client)
            .then(({ data: client }) => enrollmentActions.createEnrollment({
                ...data.enrollment,
                client: client.id,
                manager: user.id,
                request: request.id
            }))
            .then(({ data: enrollment }) => requestActions.updateRequest(request.id, {
                ...data.request,
                status: 'completed',
                enrollmentId: enrollment.enrollment,
                learnerId: enrollment.learnerId
            }))
            .then(({ data }) => history.push(`/learners/${data.client.id}`));
    }, [request]);

    const handleExistingClient = useCallback(() => {
        return requestActions.updateRequest(requestWithExistingClient.id, {
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
        toggleRequestFormOpen(true);
    }, []);

    const handleDeleteRequest = useCallback(() => {
        return requestActions.deleteRequest(request.id)
            .then(() => {
                requestActions.unsetRequest();
                toggleConfirmationDialogOpen(false);
            });
    }, [request]);

    const handleDeleteConfirm = useCallback(request => {
        requestActions.setRequest(request);
        toggleConfirmationDialogOpen(true);
    }, []);

    const handleSearch = useCallback(params => {
        console.log(params);
    }, []);

    if (!requests) return <LoadingIndicator />;

    return (
        <Page className="RequestsPage">
            <Page.Header
                title="Заявки"
                toolbar={[
                    {
                        key: 'search',
                        icon: isSearchFormOpen ? 'search_off' : 'search',
                        onClick: toggleSearchFormOpen
                    }
                ]}
            />

            <Page.Content>
                <RequestSearchForm
                    onSubmit={handleSearch}
                />

                <Page.Section variant="outlined" compact>
                    <RequestsTable
                        requests={requests}
                        manager={user}
                        onEdit={handleEditRequest}
                        onProcess={handleCheckRequest}
                        onDelete={handleDeleteConfirm}
                    />
                </Page.Section>
            </Page.Content>

            <RequestProcessFormDialog
                request={request}
                open={isRequestProcessPanelOpen}
                onSubmit={handleProcessRequestSubmit}
                onClose={toggleRequestProcessPanelOpen}
            />

            <FormDialog
                title="Редактирование заявки"
                open={isRequestFormOpen}
                onClose={toggleRequestFormOpen}
            >
                <RequestForm
                    id="request-edit-form"
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
                onClose={toggleConfirmationDialogOpen}
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