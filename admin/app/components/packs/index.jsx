import { useCallback, useEffect, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import IconButton from 'shared/components/icon-button';
import LoadingIndicator from 'shared/components/loading-indicator';
import FormDialog from 'shared/components/form-dialog';
import PageSection from 'shared/components/page-section';

import { useStore } from 'app/hooks/store';
import PacksTable from 'app/components/packs/packs-table';
import PackForm from 'app/components/packs/pack-form';

export default function Packs() {
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

    const handleCreate = useCallback(() => {
        toggleCreateFormOpen(true);
    }, []);

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
        <PageSection
            title="Пакеты"
            actions={
                <IconButton
                    title="Создать"
                    icon="add"
                    flat
                    onClick={handleCreate}
                />
            }
        >
            <PacksTable
                packs={packs}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <FormDialog
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
        </PageSection>
    );
}