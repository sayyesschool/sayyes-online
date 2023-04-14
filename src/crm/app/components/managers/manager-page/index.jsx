import { useCallback, useEffect } from 'react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { Flex, Grid } from 'shared/ui-components';

import { useStore } from 'app/hooks/store';
import ManagerForm from 'app/components/managers/manager-form';
import ManagerDetails from 'app/components/managers/manager-details';
import ManagerEnrollments from 'app/components/managers/manager-enrollments';
import ManagerRequests from 'app/components/managers/manager-requests';
import PasswordForm from 'app/components/shared/password-form';

export default function ManagerPage({ match, location, history }) {
    const [manager, managerActions] = useStore('managers.single');

    const [isManagerFormOpen, toggleManagerFormOpen] = useBoolean(false);
    const [isPasswordDialogOpen, togglePasswordDialogOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    useEffect(() => {
        managerActions.getManager(match.params.id)
            .then(() => {
                if (location.state?.edit) {
                    toggleManagerFormOpen(true);
                } else if (location.state?.delete) {
                    toggleConfirmationDialogOpen(true);
                }
            });
    }, []);

    const updateManager = useCallback(data => {
        return managerActions.updateManager(manager.id, data)
            .then(() => toggleManagerFormOpen(false));
    }, [manager]);

    const updatePassword = useCallback(password => {
        return managerActions.updateManager(manager.id, { password })
            .finally(() => togglePasswordDialogOpen(false));
    }, [manager]);

    const deleteManager = useCallback(() => {
        return managerActions.deleteClient(manager.id)
            .then(() => history.push('/managers'));
    }, [manager]);

    if (!manager) return <LoadingIndicator />;

    return (
        <Page className="ManagerPage">
            <Page.Header
                breadcrumbs={[
                    { content: 'Менеджеры', to: '/managers' }
                ]}
                title={manager?.fullname}
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
                <Grid>
                    <Flex gap="medium" column>
                        <ManagerDetails
                            manager={manager}
                            onEdit={toggleManagerFormOpen}
                        />
                    </Flex>

                    <Flex gap="medium" column>
                        <ManagerRequests
                            requests={manager.requests}
                        />

                        <ManagerEnrollments
                            manager={manager}
                        />
                    </Flex>
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