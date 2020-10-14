import React, { useState, useEffect, useCallback } from 'react';

import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import { useStore, useActions } from 'app/store';
import ConfirmationDialog from 'app/components/shared/confirmation-dialog';
import FormPanel from 'app/components/shared/form-panel';
import RequestDetails from 'app/components/requests/request-details';
import RequestForm from 'app/components/requests/request-form';
import ClientForm from 'app/components/clients/client-form';
import LessonForm from 'app/components/lessons/lesson-form';

export default function RequestPage({ match, history }) {
    const [isRequestFormOpen, setRequestFormOpen] = useState(false);
    const [isClientFormOpen, setClientFormOpen] = useState(false);
    const [isLessonFormOpen, setLessonFormOpen] = useState(false);
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [request, actions] = useStore('requests.single');
    const [managers] = useStore('managers.list');
    const clientActions = useActions('clients');
    const lessonActions = useActions('lessons');

    useEffect(() => {
        actions.getRequest(match.params.id);
    }, []);

    const handleRequestSubmit = useCallback(data => {
        actions.updateRequest(data.id, data)
            .then(() => setRequestFormOpen(false));
    }, []);

    const handleClientSubmit = useCallback(data => {
        clientActions.createClient(data)
            .then(response => actions.updateRequest(request.id, { client: response.data.id }))
            .then(response => history.push(`/clients/${response.data.client}`));
    }, [request]);

    const handleLessonSubmit = useCallback(data => {
        lessonActions.createLesson(data)
            .then(response => actions.updateRequest(request.id, { lesson: response.data.id }))
            .then(() => setLessonFormOpen(false));
    }, [request]);

    const handleEdit = useCallback(() => {
        setRequestFormOpen(true);
    }, []);

    const handleCreateLesson = useCallback(() => {
        setLessonFormOpen(true);
    }, []);

    const handleCreateClient = useCallback(() => {
        setClientFormOpen(true);
    }, []);

    const handleDelete = useCallback(() => {
        setConfirmationDialogOpen(true);
    }, []);

    const deleteRequest = useCallback(() => {
        actions.deleteRequest(request.id)
            .then(() => {
                history.push('/requests');
                setConfirmationDialogOpen(false);
            });
    }, [request]);

    return (
        <Page id="request" loading={!request}>
            <PageContent>
                <PageHeader
                    title="Заявка"
                    controls={[
                        {
                            key: 'edit',
                            title: 'Изменить',
                            icon: 'edit',
                            onClick: handleEdit
                        },
                        !request?.client && {
                            key: 'client',
                            title: 'Создать клиента',
                            icon: 'person_add',
                            onClick: handleCreateClient
                        },
                        !request?.lesson && {
                            key: 'lesson',
                            title: 'Организовать пробный урок',
                            icon: 'event',
                            onClick: handleCreateLesson
                        },
                        {
                            key: 'delete',
                            title: 'Удалить',
                            icon: 'delete',
                            onClick: handleDelete
                        },
                        {
                            key: 'messages',
                            title: 'Переписка',
                            icon: 'forum',
                            onClick: () => setSidePanelOpen(isOpen => !isOpen)
                        }
                    ]}
                />

                <RequestDetails
                    request={request}
                />
            </PageContent>

            <FormPanel
                title="Редактирование заявки"
                form="request-form"
                open={isRequestFormOpen}
                onClose={() => setRequestFormOpen(false)}
            >
                <RequestForm
                    request={request}
                    managers={managers}
                    onSubmit={handleRequestSubmit}
                />
            </FormPanel>

            <FormPanel
                title="Новый клиент"
                form="client-form"
                open={isClientFormOpen}
                onClose={() => setClientFormOpen(false)}
            >
                <ClientForm
                    client={request?.contact}
                    onSubmit={handleClientSubmit}
                />
            </FormPanel>

            <FormPanel
                title="Пробный урок"
                form="lesson-form"
                open={isLessonFormOpen}
                onClose={() => setLessonFormOpen(false)}
            >
                {request &&
                    <LessonForm
                        lesson={request.lesson}
                        defaultLesson={{
                            client: request.client,
                            trial: true
                        }}
                        onSubmit={handleLessonSubmit}
                    />
                }
            </FormPanel>

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите удалить заявку?"
                open={isConfirmationDialogOpen}
                onConfirm={deleteRequest}
                onClose={() => setConfirmationDialogOpen(false)}
            />
        </Page>
    );
}