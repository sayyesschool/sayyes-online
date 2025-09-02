import { useCallback, useEffect, useState } from 'react';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useBoolean } from 'shared/hooks/state';
import { useRequest, useRequests } from 'shared/store/requests';

import RequestForm from 'crm/components/requests/request-form';
import RequestProcessFormDialog from 'crm/components/requests/request-process-form-dialog';
import RequestsSearch from 'crm/components/requests/requests-search';
import RequestsTable from 'crm/components/requests/requests-table';
import { useActions, useStore } from 'crm/store';

export default function RequestsPage({ history }) {
    const [user] = useStore('user');
    const [managers] = useStore('managers.list');
    const [requests, requestActions] = useRequests();
    const [request] = useRequest();
    const learnerActions = useActions('learners');
    const enrollmentActions = useActions('enrollments');
    const { showNotification } = useActions('notification');

    const [searchParams, setSearchParams] = useState();
    const [isLoading, setLoading] = useState(false);
    const [isRequestProcessPanelOpen, toggleRequestProcessPanelOpen] = useBoolean(false);
    const [isRequestFormOpen, toggleRequestFormOpen] = useBoolean(false);
    const [requestWithExistingLearner, setRequestWithExistingLearner] = useState();

    const handleProcessRequest = useCallback(request => {
        if (!request.managerId) {
            requestActions.updateRequest(request.id, {
                status: 'processing',
                managerId: user.id
            }).then(() => toggleRequestProcessPanelOpen(true));
        } else if (request.managerId === user.id) {
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
                learnerId: learner.id,
                managerId: user.id,
                requestId: request.id
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

    const handleCreateRequest = useCallback(data => {
        return requestActions.createRequest(data)
            .then(() => toggleRequestFormOpen(false));
    }, []);

    const handleUpdateRequest = useCallback(data => {
        return requestActions.updateRequest(data.id, data)
            .then(() => toggleRequestFormOpen(false));
    }, []);

    const handleDeleteRequest = useCallback(request => {
        return requestActions.deleteRequest(request.id)
            .then(() => requestActions.unsetRequest());
    }, [requestActions]);

    const handleSearchSubmit = useCallback(params => {
        setSearchParams(prevParams => ({ ...prevParams, ...params }));

        setLoading(true);

        return requestActions.getRequests(params).finally(() => setLoading(false));
    }, [requestActions]);

    const handleSearchClear = useCallback(() => {
        setSearchParams();

        setLoading(true);

        return requestActions.getRequests().finally(() => setLoading(false));
    }, [requestActions]);

    if (!requests) return <LoadingIndicator />;

    return (
        <Page className="RequestsPage">
            <Page.Header
                title="Заявки"
                actions={[
                    {
                        key: 'export',
                        as: 'a',
                        href: '/api/requests/export' + (searchParams ? `?${new URLSearchParams(searchParams).toString()}` : ''),
                        download: true,
                        icon: 'file_export',
                        content: 'Экспорт в CSV',
                        variant: 'plain'
                    },
                    {
                        key: 'new',
                        icon: 'add',
                        content: 'Создать заявку',
                        variant: 'solid',
                        onClick: () => toggleRequestFormOpen(true)
                    }
                ]}
                loading={isLoading}
            >
                <RequestsSearch
                    onSubmit={handleSearchSubmit}
                    onClear={handleSearchClear}
                />
            </Page.Header>

            <Page.Content>
                <Page.Section
                    variant="outlined"
                    compact
                    scrollable
                >
                    <RequestsTable
                        requests={requests}
                        manager={user}
                        onEdit={handleEditRequest}
                        onProcess={handleCheckRequest}
                        onDelete={handleDeleteRequest}
                    />
                </Page.Section>
            </Page.Content>

            {request &&
                <RequestProcessFormDialog
                    request={request}
                    open={isRequestProcessPanelOpen}
                    onSubmit={handleProcessRequestSubmit}
                    onClose={toggleRequestProcessPanelOpen}
                />
            }

            <FormDialog
                title={request ? 'Редактирование заявки' : 'Создание заявки'}
                open={isRequestFormOpen}
                submitButtonText={request ? 'Сохранить' : 'Создать'}
                onClose={toggleRequestFormOpen}
            >
                <RequestForm
                    id="request-form"
                    request={request}
                    managers={managers}
                    onSubmit={request ? handleUpdateRequest : handleCreateRequest}
                />
            </FormDialog>

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