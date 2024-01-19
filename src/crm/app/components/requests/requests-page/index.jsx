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

    const learnerActions = useActions('learners');
    const enrollmentActions = useActions('enrollments');
    const { showNotification } = useActions('notification');

    const [isRequestProcessPanelOpen, toggleRequestProcessPanelOpen] = useBoolean(false);
    const [isRequestFormOpen, toggleRequestFormOpen] = useBoolean(false);
    const [isSearchFormOpen, toggleSearchFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);
    const [requestWithExistingLearner, setRequestWithExistingLearner] = useState();

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
                if (request.existingLearner) {
                    setRequestWithExistingLearner(request);
                } else {
                    handleProcessRequest(request);
                }
            });
    }, []);

    const handleProcessRequestSubmit = useCallback(data => {
        return learnerActions.createLearner(data.learner)
            .then(({ data: learner }) => enrollmentActions.createEnrollment({
                ...data.enrollment,
                learner: learner.id,
                manager: user.id,
                request: request.id
            }))
            .then(({ data: enrollment }) => requestActions.updateRequest(request.id, {
                ...data.request,
                status: 'completed',
                enrollmentId: enrollment.enrollment,
                learnerId: enrollment.learnerId
            }))
            .then(({ data }) => history.push(`/learners/${data.learner.id}`));
    }, [request]);

    const handleExistingLearner = useCallback(() => {
        return requestActions.updateRequest(requestWithExistingLearner.id, {
            status: 'completed',
            manager: user.id,
            learner: requestWithExistingLearner.existingLearner.id
        }).then(({ data }) => {
            history.push(`/learners/${data.learner.id}`);
            showNotification({ text: 'Заявка привязана к клиенту' });
        });
    }, [requestWithExistingLearner]);

    const handleContinueProcessing = useCallback(() => {
        delete requestWithExistingLearner.existingLearner;
        handleProcessRequest(requestWithExistingLearner);
        setRequestWithExistingLearner(undefined);
    }, [requestWithExistingLearner]);

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
                message={`Номер телефона в заявке совпадает с номером телефона существующего клиента ${requestWithExistingLearner?.existingLearner.fullname} (${requestWithExistingLearner?.existingLearner.phone}). Вы хотите привязать заявку к нему?`}
                open={Boolean(requestWithExistingLearner)}
                onConfirm={handleExistingLearner}
                onClose={handleContinueProcessing}
            />
        </Page>
    );
}