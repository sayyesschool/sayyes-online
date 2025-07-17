import { useCallback, useEffect } from 'react';

import { RefEntity } from 'core/models/common/constants';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useManagers } from 'shared/hooks/managers';
import { useBoolean } from 'shared/hooks/state';
import { useUser } from 'shared/hooks/user';
import { Flex, Grid } from 'shared/ui-components';

import LearnerContacts from 'crm/components/learners/learner-contacts';
import LearnerDetails from 'crm/components/learners/learner-details';
import LearnerEnrollments from 'crm/components/learners/learner-enrollments';
import LearnerForm from 'crm/components/learners/learner-form';
import LearnerMemberships from 'crm/components/learners/learner-memberships';
import LearnerPayments from 'crm/components/learners/learner-payments';
import LearnerRequests from 'crm/components/learners/learner-requests';
import LearnerTasks from 'crm/components/learners/learner-tasks';
import LearnerTransactions from 'crm/components/learners/learner-transactions';
import PasswordForm from 'crm/components/shared/password-form';
import TasksReference from 'crm/components/tasks/tasks-reference';
import { useStore } from 'crm/store';

export default function LearnerPage({ match, location, history }) {
    const [user] = useUser();
    const [learner, learnerActions] = useStore('learners.single');
    const [managers] = useManagers();

    const [isLearnerFormOpen, toggleLearnerFormOpen] = useBoolean(false);
    const [isPasswordDialogOpen, togglePasswordDialogOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    useEffect(() => {
        learnerActions.getLearner(match.params.id)
            .then(() => {
                if (location.state?.edit) {
                    toggleLearnerFormOpen(true);
                } else if (location.state?.delete) {
                    toggleConfirmationDialogOpen(true);
                }
            });

        return () => learnerActions.unsetLearner();
    }, []);

    const updateLearner = useCallback(data => {
        return learnerActions.updateLearner(learner.id, data)
            .finally(() => toggleLearnerFormOpen(false));
    }, [learner]);

    const updatePassword = useCallback(password => {
        return learnerActions.updateLearner(learner.id, { password })
            .finally(() => togglePasswordDialogOpen(false));
    }, [learner]);

    const deleteLearner = useCallback(() => {
        return learnerActions.deleteLearner(learner.id)
            .then(() => history.push('/learners'));
    }, [learner]);

    if (!learner) return <LoadingIndicator />;

    return (
        <Page className="LearnerPage">
            <Page.Header
                breadcrumbs={[
                    { content: 'Клиенты', to: '/learners' }
                ]}
                title={learner?.fullname}
                description={`Баланс: ${learner?.balance} руб.`}
                actions={[
                    (learner.hhid && {
                        as: 'a',
                        href: `https://sayes.t8s.ru/Profile/${learner.hhid}`,
                        target: '_blank',
                        icon: 'link',
                        title: 'Открыть в Hollihop'
                    }),
                    {
                        key: 'password',
                        title: 'Изменить пароль',
                        icon: 'password',
                        onClick: togglePasswordDialogOpen
                    },
                    {
                        key: 'edit',
                        title: 'Редактировать',
                        icon: 'edit',
                        onClick: toggleLearnerFormOpen
                    },
                    {
                        key: 'delete',
                        title: 'Удалить',
                        icon: 'delete',
                        onClick: toggleConfirmationDialogOpen
                    }
                ]}
            />

            <Page.Content>
                <Grid spacing={2}>
                    <Grid.Item xs={4}>
                        <Flex gap="medium" column>
                            <LearnerDetails
                                learner={learner}
                            />

                            <LearnerContacts
                                learner={learner}
                                onUpdate={updateLearner}
                            />
                        </Flex>
                    </Grid.Item>

                    <Grid.Item xs={8}>
                        <Flex gap="medium" column>
                            <LearnerRequests
                                requests={learner?.requests}
                            />

                            <LearnerEnrollments
                                learner={learner}
                                manager={{
                                    id: user.id
                                }}
                            />

                            <LearnerMemberships
                                learner={learner}
                                memberships={learner?.memberships}
                            />

                            <LearnerPayments
                                learner={learner}
                            />

                            <LearnerTransactions
                                learner={learner}
                            />
                        </Flex>
                    </Grid.Item>

                    <Grid.Item xs={12}>
                        <LearnerTasks learner={learner} />
                    </Grid.Item>
                </Grid>
            </Page.Content>

            <FormDialog
                form="learner-form"
                title="Данные клиента"
                open={isLearnerFormOpen}
                onClose={toggleLearnerFormOpen}
            >
                <LearnerForm
                    id="learner-form"
                    learner={learner}
                    onSubmit={updateLearner}
                />
            </FormDialog>

            <FormDialog
                form="password-form"
                title="Изменение пароля"
                open={isPasswordDialogOpen}
                onClose={togglePasswordDialogOpen}
            >
                <PasswordForm
                    id="password-form"
                    onSubmit={updatePassword}
                />
            </FormDialog>

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите удалить клиента?"
                open={isConfirmationDialogOpen}
                onConfirm={deleteLearner}
                onClose={toggleConfirmationDialogOpen}
            />
        </Page >
    );
}