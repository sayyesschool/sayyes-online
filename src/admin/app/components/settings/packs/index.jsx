import { useCallback, useEffect, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import Button from 'shared/ui-components/button';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import PageSection from 'shared/components/page-section';

import { useStore } from 'app/store';
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
        return actions.createPack(data)
            .then(() => toggleCreateFormOpen(false));
    }, []);

    const updatePack = useCallback(data => {
        return actions.updatePack(pack.id, data)
            .then(() => {
                setPack(null);
                toggleEditFormOpen(false);
            });
    }, [pack]);

    const deletePack = useCallback(() => {
        return actions.delete(pack.id)
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
            actions={[{
                key: 'add',
                icon: 'add',
                onClick: handleCreate
            }]}
            variant="outlined"
            compact
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