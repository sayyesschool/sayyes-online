import { useCallback, useState, useEffect } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { Button, MenuButton } from 'shared/ui-components';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import PageSection from 'shared/components/page-section';

import ExerciseItemWrapper from 'app/components/courses/exercise-item-wrapper';

import './index.scss';

import { exerciseTypeMenuItems } from 'shared/data/exercise';

export default function ExerciseItems({
    exercise,
    onCreate,
    onUpdate,
    onDelete,
    onReorder
}) {
    const [editingItemId, setEditingItemId] = useState();
    const [deletingItem, setDeletingItem] = useState();

    useEffect(() => {
        if (editingItemId) {
            document.getElementById(editingItemId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [editingItemId]);

    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleCreate = useCallback((event, { value }) => {
        return onCreate({ item: { type: value } })
            .then(response => setEditingItemId(response.data.item.id));
    }, []);

    const handleAdd = useCallback((type, position) => {
        return onCreate({ item: { type }, position })
            .then(response => setEditingItemId(response.data.item.id));
    }, []);

    const handleUpdate = useCallback((itemId, data) => {
        return onUpdate(itemId, data)
            .then(() => setEditingItemId(undefined));
    }, []);

    const handleDelete = useCallback(() => {
        return onDelete(deletingItem.id, deletingItem)
            .then(() => {
                setDeletingItem();
                toggleConfirmationDialogOpen(false);
            });
    }, [deletingItem]);

    const handleMove = useCallback((index, dir) => {
        const items = exercise.items.slice();
        const item = items[index];
        const otherItem = items[index + dir];

        items[index + dir] = item;
        items[index] = otherItem;

        onReorder({ items });
    }, [exercise]);

    const handleEdit = useCallback(itemId => {
        setEditingItemId(itemId);
    }, []);

    const handleDeleteRequest = useCallback(item => {
        setDeletingItem(item);
        toggleConfirmationDialogOpen(true);
    }, []);

    return (
        <PageSection
            className="exercise-items"
            title="Элементы"
        >
            {exercise.items.map((item, index) =>
                <ExerciseItemWrapper
                    key={item.id}
                    index={index}
                    item={item}
                    editing={editingItemId === item.id}
                    isFirst={index === 0}
                    isLast={index === exercise.items.length - 1}
                    onEdit={handleEdit}
                    onUpdate={handleUpdate}
                    onDelete={handleDeleteRequest}
                    onAdd={handleAdd}
                    onMove={handleMove}
                />
            )}

            <MenuButton
                className="new-item-button"
                trigger={
                    <Button
                        icon="add"
                        content="Добавить элемент"
                        variant="outlined"
                    />
                }
                items={exerciseTypeMenuItems}
                onMenuItemClick={handleCreate}
            />

            <ConfirmationDialog
                title="Удалить элемент?"
                message="Элемент будет удален без возможности восстановления."
                open={isConfirmationDialogOpen}
                onClose={toggleConfirmationDialogOpen}
                onConfirm={handleDelete}
            />
        </PageSection>
    );
}