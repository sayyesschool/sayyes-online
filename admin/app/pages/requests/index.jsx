import React, { useState, useEffect, useCallback } from 'react';

import { useStore } from 'app/store';
import Page from 'app/components/shared/page';
import PageHeader from 'app/components/shared/page-header';
import PageContent from 'app/components/shared/page-content';
import ConfirmationDialog from 'app/components/shared/confirmation-dialog';
import FormPanel from 'app/components/shared/form-panel';
import RequestList from 'app/components/requests/request-list';
import RequestForm from 'app/components/requests/request-form';
import StudentForm from 'app/components/users/student-form';

export default function Requests() {
    const [isRequestFormOpen, setRequestFormOpen] = useState(false);
    const [isStudentFormOpen, setStudentFormOpen] = useState(false);
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [request, setRequest] = useState(undefined);
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

    const handleRequestEdit = useCallback(request => {
        setRequest(request);
        setRequestFormOpen(true);
    }, []);

    const handleRequestTransform = useCallback(request => {
        setRequest(request);
        setStudentFormOpen(true);
    }, []);

    const handleRequestDelete = useCallback(request => {
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
                        text: 'Создать',
                        iconProps: { iconName: 'Add' },
                        onClick: () => setRequestFormOpen(true)
                    }
                ]}
            />

            <PageContent loading={!requests}>
                <RequestList
                    requests={requests}
                    onEdit={handleRequestEdit}
                    onTransform={handleRequestTransform}
                    onDelete={handleRequestDelete}
                />
            </PageContent>

            <FormPanel
                title={request && request.id ? 'Редактирование заявки' : 'Новая заявка'}
                form="request-form"
                isOpen={isRequestFormOpen}
                onDismiss={() => setRequestFormOpen(false)}
            >
                <RequestForm
                    request={request}
                    onSubmit={handleRequestSubmit}
                />
            </FormPanel>

            <FormPanel
                headerText="Регистрация студента"
                isOpen={isStudentFormOpen}
                onDismiss={() => setStudentFormOpen(false)}
            >
                <StudentForm
                    student={{
                        firstname: request?.contact.name,
                        phone: request?.contact.phone
                    }}
                    onSubmit={console.log}
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