import React, { useEffect, useCallback } from 'react';
import {
    LayoutGrid as Grid
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/hooks/store';
import FormPanel from 'app/components/shared/form-panel';
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

    const handleUpdate = useCallback(data => {
        managerActions.updateManager(manager.id, data)
            .then(() => toggleManagerFormOpen(false));
    }, [manager]);

    const handleDelete = useCallback(() => {
        managerActions.deleteClient(client.id)
            .then(() => history.push('/clients'));
    }, [manager]);

    if (!manager) return <LoadingIndicator />;

    return (
        <Page id="manager">
            <PageTopBar
                title={manager.fullname}
                actions={[
                    {
                        key: 'delete',
                        title: 'Удалить',
                        icon: 'delete',
                        onClick: toggleConfirmationDialogOpen
                    }
                ]}
            />

            <PageContent>
                <Grid>
                    <Grid.Cell span="3">
                        <ManagerDetails
                            manager={manager}
                            onEdit={() => toggleManagerFormOpen(true)}
                        />
                    </Grid.Cell>

                    <Grid.Cell span="3" grid>
                        <Grid.Cell span="12">
                            <ManagerRequests
                                requests={manager.requests}
                            />
                        </Grid.Cell>
                    </Grid.Cell>

                    <Grid.Cell span="3">
                        <ManagerEnrollments
                            manager={manager}
                            onCreate={() => setEnrollmentFormOpen(true)}
                        />
                    </Grid.Cell>
                </Grid>
            </PageContent>

            <FormPanel
                form="manager-form"
                title="Данные менеджера"
                open={isManagerFormOpen}
                modal
                onClose={toggleManagerFormOpen}
            >
                <ManagerForm
                    manager={manager}
                    onSubmit={handleUpdate}
                />
            </FormPanel>

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите удалить менеджера?"
                open={isConfirmationDialogOpen}
                onConfirm={handleDelete}
                onClose={toggleConfirmationDialogOpen}
            />
        </Page>
    );
}