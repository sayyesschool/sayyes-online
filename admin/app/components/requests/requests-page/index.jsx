import React, { useState, useEffect, useCallback } from 'react';

import { useStore, useActions } from 'app/store';
import Page from 'app/components/shared/page';
import PageHeader from 'app/components/shared/page-header';
import PageContent from 'app/components/shared/page-content';
import PageSidePanel from 'app/components/shared/page-side-panel';
import ConfirmationDialog from 'app/components/shared/confirmation-dialog';
import FormPanel from 'app/components/shared/form-panel';
import RequestList from 'app/components/requests/request-list';
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

    useEffect(() => {
        requestActions.getRequests();
    }, []);

    const handleUpdateRequest = useCallback(data => {
        requestActions.updateRequest(data.id, data)
            .then(() => setRequestFormOpen(false));
    }, []);

    const handleProcessRequest = useCallback(request => {
        requestActions.getRequest(request.id)
            .then(({ data: request }) => {
                if (!request.manager) {
                    requestActions.updateRequest(request.id, { status: 'processing', manager: user.id })
                        .then(() => setRequestProcessPanelOpen(true));
                } else if (request.manager.id === user.id) {
                    setRequestProcessPanelOpen(true);
                } else {
                    showNotification({ text: `Обработкой заявки уже занимается ${request.manager.fullname}` });
                }
            });
    }, [user]);

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

    const handleEditRequest = useCallback(request => {
        requestActions.setRequest(request);
        setRequestFormOpen(true);
    }, []);

    const handleDeleteRequest = useCallback(() => {
        requestActions.deleteRequest(request.id)
            .then(() => {
                requestActions.setRequest();
                setConfirmationDialogOpen(false);
            });
    }, [request]);

    const handleDeleteConfirm = useCallback(request => {
        requestActions.setRequest(request);
        setConfirmationDialogOpen(true);
    }, []);

    return (
        <Page id="requests" loading={!requests}>
            <PageHeader
                title="Заявки"
                controls={[
                    {
                        key: 'search',
                        icon: 'search',
                        onClick: () => setSidePanelOpen(isOpen => !isOpen)
                    }
                ]}
            />

            <PageSidePanel
                title="Поиск"
                open={isSidePanelOpen}
                dismissible
                onClose={() => setSidePanelOpen(false)}
            >
                <RequestSearchForm />
            </PageSidePanel>

            <PageContent>
                <RequestList
                    requests={requests}
                    manager={user}
                    onEdit={handleEditRequest}
                    onProcess={handleProcessRequest}
                    onDelete={handleDeleteConfirm}
                />
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
        </Page>
    );
}