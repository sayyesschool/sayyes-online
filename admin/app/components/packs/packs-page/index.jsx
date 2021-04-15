import React, { useState, useEffect, useCallback } from 'react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import FormDialog from 'shared/components/form-dialog';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/hooks/store';
import PacksTable from 'app/components/packs/packs-table';
import PackForm from 'app/components/packs/pack-form';

export default function PacksPage() {
    const [packs, actions] = useStore('packs.list');
    const [pack, setPack] = useState();

    const [isCreateFormOpen, toggleCreateFormOpen] = useBoolean(false);
    const [isEditFormOpen, toggleEditFormOpen] = useBoolean(false);
    const [isDeleteDialogOpen, toggleDeleteDialogOpen] = useBoolean(false);

    useEffect(() => {
        actions.getPacks();
    }, []);

    const createPack = useCallback(data => {
        actions.createPack(data)
            .then(() => toggleCreateFormOpen(false));
    }, []);

    const updatePack = useCallback(data => {
        actions.updatePack(pack.id, data)
            .then(() => {
                setPack(null);
                toggleEditFormOpen(false);
            });
    }, [pack]);

    const deletePack = useCallback(() => {
        actions.delete(pack.id)
            .then(() => {
                setPack(null);
                toggleDeleteDialogOpen(false);
            });
    }, [pack]);

    const handleEdit = useCallback(pack => {
        setPack(pack);
        toggleEditFormOpen(true);
    }, []);

    const handleDelete = useCallback(pack => {
        setPack(pack);
        toggleDeleteDialogOpen(true);
    }, []);

    if (!packs) return <LoadingIndicator />;

    return (
        <Page id="packs-page">
            <PageTopBar
                title="Пакеты"
                actions={[
                    {
                        key: 'add',
                        label: 'Создать',
                        icon: 'add',
                        unelevated: true,
                        onClick: toggleCreateFormOpen
                    }
                ]}
            />

            <PageContent>
                <PacksTable
                    packs={packs}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </PageContent>

            <FormDialog
                form="create-pack-form"
                title="Новый пакет"
                open={isCreateFormOpen}
                onClose={toggleCreateFormOpen}
            >
                <PackForm
                    id="create-pack-form"
                    onSubmit={createPack}
                />
            </FormDialog>

            <FormDialog
                form="edit-pack-form"
                title="Редактирование пакета"
                open={isEditFormOpen}
                onClose={toggleEditFormOpen}
            >
                <PackForm
                    id="edit-pack-form"
                    pack={pack}
                    onSubmit={updatePack}
                />
            </FormDialog>

            <ConfirmationDialog
                title="Подтвердите действие"
                message={'Вы действительно хотите удалить пакет?'}
                open={isDeleteDialogOpen}
                onConfirm={deletePack}
                onClose={toggleDeleteDialogOpen}
            />
        </Page>
    );
}