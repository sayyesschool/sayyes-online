import { useCallback, useEffect } from 'react';

import { useBoolean } from 'shared/hooks/state';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import FormDialog from 'shared/components/form-dialog';
import ConfirmationDialog from 'shared/components/confirmation-dialog';

import { useStore } from 'app/hooks/store';
import MaterialForm from 'app/components/materials/material-form';
import MaterialDetails from 'app/components/materials/material-details';

import './index.scss';

export default function MaterialPage({ match, history }) {
    const [material, actions] = useStore('materials.single');

    const [isEditFormOpen, toggleEditFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    useEffect(() => {
        actions.getMaterial(match.params.id);
    }, []);

    const handleUpdate = useCallback(data => {
        return actions.updateMaterial(material.id, data)
            .then(() => toggleEditFormOpen(false));
    }, [material]);

    const handleDelete = useCallback(() => {
        return actions.deleteMaterial(material.id)
            .then(() => history.push('/materials'));
    }, [material]);

    if (!material) return <LoadingIndicator />;

    return (
        <Page id="material-page">
            <PageHeader
                title={material.title}
                actions={[
                    {
                        key: 'delete',
                        icon: 'delete',
                        title: 'Удалить встречу',
                        onClick: toggleConfirmationDialogOpen
                    }
                ]}
            />

            <PageContent>
                <MaterialDetails
                    material={material}
                />
            </PageContent>

            <FormDialog
                title="Редактирование материала"
                open={isEditFormOpen}
                onClose={toggleEditFormOpen}
            >
                <MaterialForm
                    onSubmit={handleUpdate}
                />
            </FormDialog>

            <ConfirmationDialog
                title="Удалить материал?"
                open={isConfirmationDialogOpen}
                onConfirm={handleDelete}
                onClose={() => toggleConfirmationDialogOpen(false)}
            />
        </Page>
    );
}