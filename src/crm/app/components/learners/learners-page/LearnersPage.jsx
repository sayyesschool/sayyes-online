import { useCallback, useEffect, useState } from 'react';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import UsersSearch from 'shared/components/users-search';
import { useBoolean } from 'shared/hooks/state';

import LearnerForm from 'crm/components/learners/learner-form';
import LearnersTable from 'crm/components/learners/learners-table';
import { useStore } from 'crm/hooks/store';

export default function LearnersPage({ history }) {
    const [learners, actions] = useStore('learners.list');
    const [learner, setLearner] = useState();

    const [isFormOpen, toggleFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    useEffect(() => {
        actions.getLearners();
    }, []);

    const createLearner = useCallback(data => {
        return actions.createLearner(data)
            .finally(() => toggleFormOpen(false));
    }, []);

    const deleteLearner = useCallback(() => {
        return actions.deleteLearner(learner.id)
            .finally(() => {
                setLearner(null);
                toggleConfirmationDialogOpen(false);
            });
    }, [learner]);

    const handleEdit = useCallback(learner => {
        history.push(learner.url, { edit: true });
    }, []);

    const handleDelete = useCallback(learner => {
        setLearner(learner);
        toggleConfirmationDialogOpen(true);
    }, []);

    if (!learners) return <LoadingIndicator />;

    return (
        <Page className="LearnersPage">
            <Page.Header
                title="Ученики"
                actions={[{
                    key: 'add',
                    icon: 'add',
                    title: 'Создать',
                    onClick: toggleFormOpen
                }]}
            />

            <Page.Content>
                <UsersSearch params={{ role: 'learner' }} />

                <Page.Section variant="outlined" compact>
                    <LearnersTable
                        learners={learners}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </Page.Section>
            </Page.Content>

            <FormDialog
                form="learner-form"
                title="Новый клиент"
                open={isFormOpen}
                onClose={toggleFormOpen}
            >
                <LearnerForm
                    id="learner-form"
                    onSubmit={createLearner}
                />
            </FormDialog>

            <ConfirmationDialog
                title="Подтвердите действие"
                message={`Вы действительно хотите удалить клиента ${learner?.fullname}?`}
                open={isConfirmationDialogOpen}
                onConfirm={deleteLearner}
                onClose={toggleConfirmationDialogOpen}
            />
        </Page>
    );
}