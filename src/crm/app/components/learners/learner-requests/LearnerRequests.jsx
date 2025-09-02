import { useCallback, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import PageSection from 'shared/components/page-section';
import { useManagers } from 'shared/hooks/managers';
import { useBoolean } from 'shared/hooks/state';
import { useRequestActions } from 'shared/store/requests';

import RequestForm from 'crm/components/requests/request-form';
import RequestsList from 'crm/components/requests/requests-list';

export default function LearnerRequests({ learner }) {
    const [managers] = useManagers();
    const actions = useRequestActions();

    const [requests, setRequests] = useState(learner?.requests || []);
    const [request, setRequest] = useState();
    const [isRequestFormOpen, toggleRequestFormOpen] = useBoolean(false);

    const handleCreateRequestRequest = useCallback(() => {
        setRequest({
            learner,
            learnerId: learner.id
        });
        toggleRequestFormOpen(true);
    }, [learner, toggleRequestFormOpen]);

    const handleCreateRequest = useCallback(data => {
        return actions.createRequest(data)
            .then(({ data: request }) => {
                setRequests(prevRequests => [...prevRequests, request]);
                toggleRequestFormOpen(false);
            });
    }, [actions, toggleRequestFormOpen]);

    const handleUpdateRequest = useCallback(data => {
        return actions.updateRequest(data.id, data)
            .then(() => toggleRequestFormOpen(false));
    }, [actions, toggleRequestFormOpen]);

    const handleDeleteRequest = useCallback(request => {
        return actions.deleteRequest(request.id)
            .then(() => actions.unsetRequest());
    }, [actions]);

    return (
        <PageSection
            className="LearnerRequests"
            title="Заявки"
            actions={[
                {
                    key: 'new',
                    icon: 'add',
                    title: 'Создать заявку',
                    onClick: handleCreateRequestRequest
                }
            ]}
            compact
        >
            {requests?.length > 0 &&
                <RequestsList
                    requests={requests}
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
                    onSubmit={request?.id ? handleUpdateRequest : handleCreateRequest}
                />
            </FormDialog>
        </PageSection>
    );
}