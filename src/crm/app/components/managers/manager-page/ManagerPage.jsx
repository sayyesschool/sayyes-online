import { useCallback, useEffect } from 'react';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { UserDomainLabel } from 'shared/data/user';
import { useManager } from 'shared/hooks/managers';
import { useBoolean } from 'shared/hooks/state';
import { Chip, Flex, Grid } from 'shared/ui-components';

import ManagerDetails from 'crm/components/managers/manager-details';
import ManagerEnrollments from 'crm/components/managers/manager-enrollments';
import ManagerForm from 'crm/components/managers/manager-form';
import ManagerRequests from 'crm/components/managers/manager-requests';
import PasswordForm from 'crm/components/shared/password-form';

export default function ManagerPage({ match, location, history }) {
    const [manager, actions] = useManager(match.params.id);

    const [isManagerFormOpen, toggleManagerFormOpen] = useBoolean(false);
    const [isPasswordDialogOpen, togglePasswordDialogOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    useEffect(() => {
        if (location.state?.edit) {
            toggleManagerFormOpen(true);
        } else if (location.state?.delete) {
            toggleConfirmationDialogOpen(true);
        }
    }, []);

    const updateManager = useCallback(data => {
        return actions.updateManager(manager.id, data)
            .then(() => toggleManagerFormOpen(false));
    }, [manager, actions]);

    const updatePassword = useCallback(password => {
        return actions.updateManager(manager.id, { password })
            .finally(() => togglePasswordDialogOpen(false));
    }, [manager, actions]);

    const deleteManager = useCallback(() => {
        return actions.deleteManager(manager.id)
            .then(() => history.push('/managers'));
    }, [manager, actions]);

    if (!manager) return <LoadingIndicator />;

    return (
        <Page className="ManagerPage">
            <Page.Header
                breadcrumbs={[
                    { content: 'Менеджеры', to: '/managers' }
                ]}
                title={manager.fullname}
                description={
                    <Chip.Group
                        chips={manager.domains.map(domain => ({
                            key: domain,
                            content: UserDomainLabel[domain]
                        }))}
                        variant="plain"
                    />
                }
                actions={[
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
                        onClick: toggleManagerFormOpen
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
                            <ManagerDetails
                                manager={manager}
                                onEdit={toggleManagerFormOpen}
                            />
                        </Flex>
                    </Grid.Item>

                    <Grid.Item xs={8}>
                        <Flex gap="medium" column>
                            <ManagerRequests
                                requests={manager.requests}
                            />

                            <ManagerEnrollments
                                manager={manager}
                            />
                        </Flex>
                    </Grid.Item>
                </Grid>
            </Page.Content>

            <FormDialog
                form="manager-form"
                title="Данные менеджера"
                open={isManagerFormOpen}
                modal
                onClose={toggleManagerFormOpen}
            >
                <ManagerForm
                    id="manager-form"
                    manager={manager}
                    onSubmit={updateManager}
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
                message="Вы действительно хотите удалить менеджера?"
                open={isConfirmationDialogOpen}
                onConfirm={deleteManager}
                onClose={toggleConfirmationDialogOpen}
            />
        </Page>
    );
}