import { useCallback, useEffect, useState } from 'react';
import {
    LayoutGrid, LayoutGridCell
} from 'mdc-react';

import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';
import FormDialog from 'shared/components/form-dialog';
import ConfirmationDialog from 'shared/components/confirmation-dialog';

import { useStore } from 'app/hooks/store';
import MaterialForm from 'app/components/materials/material-form';
import MaterialDetails from 'app/components/materials/material-details';

import './index.scss';

export default function Material({ match, history }) {
    const [material, actions] = useStore('materials.single');

    const [isFormOpen, setFormOpen] = useState(false);
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

    useEffect(() => {
        actions.getMaterial(match.params.id);
    }, []);

    const handleUpdate = useCallback(data => {
        actions.updateMaterial(material.id, data)
            .then(() => setFormOpen(false));
    }, [material]);

    const handleDelete = useCallback(() => {
        actions.deleteMaterial(material.id)
            .then(() => history.push('/materials'));
    }, [material]);

    if (!material) return <LoadingIndicator />;

    return (
        <Page id="material-page">
            <PageTopBar
                title={material.title}
                actions={[
                    {
                        key: 'delete',
                        icon: 'delete',
                        title: 'Удалить встречу',
                        onClick: () => setConfirmationDialogOpen(true)
                    }
                ]}
            />

            <PageContent>
                <LayoutGrid>
                    <LayoutGridCell span="4">
                        <MaterialDetails
                            material={material}
                        />
                    </LayoutGridCell>
                </LayoutGrid>
            </PageContent>

            {/* <FormDialog
                title="Новая регистрация"
                open={isRegistrationFormOpen}
                form="meeting-registration-form"
                onClose={toggleRegistrationForm}
            >
                <MeetingRegistrationForm
                    onSubmit={handleAddRegistration}
                />
            </FormDialog> */}

            {/* <ConfirmationDialog
                title="Удалить встречу?"
                open={isConfirmationDialogOpen}
                onConfirm={handleDeleteMeeting}
                onClose={() => setConfirmationDialogOpen(false)}
            /> */}
        </Page>
    );
}