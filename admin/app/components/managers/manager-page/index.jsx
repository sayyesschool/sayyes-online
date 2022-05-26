import { useCallback, useEffect } from 'react';
import { Flex, Grid } from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import FormDialog from 'shared/components/form-dialog';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/hooks/store';
import ManagerForm from 'app/components/managers/manager-form';
import ManagerDetails from 'app/components/managers/manager-details';
import ManagerEnrollments from 'app/components/managers/manager-enrollments';
import ManagerRequests from 'app/components/managers/manager-requests';

import './index.scss';

export default function ManagerPage({ match, location, history }) {
    const [manager, managerActions] = useStore('managers.single');

    const [isManagerFormOpen, toggleManagerFormOpen] = useBoolean(false);
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

    const deleteManager = useCallback(() => {
        return managerActions.deleteClient(manager.id)
            .then(() => history.push('/managers'));
    }, [manager]);

    if (!manager) return <LoadingIndicator />;

    return (
        <Page id="manager">
            <PageHeader
                breadcrumbs={[
                    { text: 'Менеджеры', url: '/managers' }
                ]}
                title={manager?.fullname}
                actions={[
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

            <PageContent>
                <Grid columns="minmax(0, 1fr) minmax(0, 2fr)">
                    <Flex gap="gap.medium" column>
                        <ManagerDetails
                            manager={manager}
                            onEdit={toggleManagerFormOpen}
                        />
                    </Flex>

                    <Flex gap="gap.medium" column>
                        <ManagerRequests
                            requests={manager.requests}
                        />

                        <ManagerEnrollments
                            manager={manager}
                        />
                    </Flex>
                </Grid>
            </PageContent>

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