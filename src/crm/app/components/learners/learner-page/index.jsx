import { useCallback, useEffect } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { useUser } from 'shared/hooks/user';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { Flex, Grid } from 'shared/ui-components';

import { useStore } from 'app/store';
import LearnerForm from 'app/components/learners/learner-form';
import LearnerDetails from 'app/components/learners/learner-details';
import LearnerContacts from 'app/components/learners/learner-contacts';
import LearnerEnrollments from 'app/components/learners/learner-enrollments';
import LearnerRequests from 'app/components/learners/learner-requests';
import LearnerTransactions from 'app/components/learners/learner-transactions';
import PasswordForm from 'app/components/shared/password-form';

export default function LearnerPage({ match, location, history }) {
    const user = useUser();
    const [learner, learnerActions] = useStore('learners.single');

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

                            <LearnerTransactions
                                learner={learner}
                            />
                        </Flex>
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