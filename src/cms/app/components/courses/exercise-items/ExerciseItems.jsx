import { useCallback, useEffect, useRef, useState } from 'react';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import ExerciseItem from 'shared/components/exercise-item';
import PageSection from 'shared/components/page-section';
import { exerciseTypeMenuItems } from 'shared/data/exercise';
import { useBoolean } from 'shared/hooks/state';
import { Button, Flex, Icon, IconButton, Menu } from 'shared/ui-components';

import ExerciseItemForm from 'cms/components/courses/exercise-item-form';

import './ExerciseItems.scss';

export default function ExerciseItems({
    exercise,
    onCreate,
    onUpdate,
    onDelete,
    onReorder
}) {
    const itemMenuButtonRef = useRef();

    const [activeItemId, setActiveItemId] = useState();
    const [editingItemId, setEditingItemId] = useState();
    const [state, setState] = useState(exercise.state || {});

    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    useEffect(() => {
        if (editingItemId) {
            document.getElementById(editingItemId)?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, [editingItemId]);

    const handleCreate = useCallback((_, { value }) => {
        return onCreate({ data: { type: value } })
            .then(response => setEditingItemId(response.data.item.id));
    }, [onCreate]);

    const handleAdd = useCallback((type, dir) => {
        const activeItemIndex = exercise.items.findIndex(item => item.id === activeItemId);

        return onCreate({
            data: { type },
            position: activeItemIndex + dir
        }).then(response => setEditingItemId(response.data.item.id));
    }, [exercise, activeItemId, onCreate]);

    const handleUpdate = useCallback(data => {
        return onUpdate(editingItemId, data)
            .then(() => setEditingItemId(undefined));
    }, [editingItemId, onUpdate]);

    const handleDelete = useCallback(() => {
        const deletingItem = exercise.items.find(item => item.id === activeItemId);

        if (!deletingItem) return;

        if (deletingItem.image?.url) {
            deletingItem.file = {
                url: deletingItem.image.url
            };
        }

        if (deletingItem.audio?.url) {
            deletingItem.file = {
                url: deletingItem.audio.url
            };
        }

        return onDelete(deletingItem.id, deletingItem)
            .then(() => {
                setActiveItemId(undefined);
                toggleConfirmationDialogOpen(false);
            });
    }, [exercise, activeItemId, onDelete, toggleConfirmationDialogOpen]);

    const handleDeleteRequest = useCallback(() => {
        toggleConfirmationDialogOpen(true);
    }, [toggleConfirmationDialogOpen]);

    const handleMoveTo = useCallback((itemId, to) => {
        const items = exercise.items.slice();
        const itemIndex = exercise.items.findIndex(item => item.id === itemId);
        const movedItems = items.splice(itemIndex, 1);

        if (to === 0) { // top
            items.unshift(...movedItems);
        } else if (to === -1) { // bottom
            items.push(...movedItems);
        }

        onReorder({ items });
    }, [exercise, onReorder]);

    const handleMove = useCallback((itemId, dir) => {
        const items = exercise.items.slice();
        const itemIndex = exercise.items.findIndex(item => item.id === itemId);
        const otherItemIndex = itemIndex + dir;
        const item = items[itemIndex];
        const otherItem = items[otherItemIndex];

        items[otherItemIndex] = item;
        items[itemIndex] = otherItem;

        onReorder({ items });
    }, [exercise, onReorder]);

    const handleEdit = useCallback(() => {
        setEditingItemId(activeItemId);
    }, [activeItemId]);

    const handleCancelEdit = useCallback(() => {
        setEditingItemId(undefined);
    }, []);

    const handleUpdateItemState = useCallback((itemId, state) => {
        setState(oldState => ({
            ...oldState,
            [itemId]: typeof state === 'function' ? state(oldState[itemId]) : state
        }));
    }, []);

    const handleItemMouseOver = useCallback(event => {
        const element = event.currentTarget;
        setActiveItemId(element.id);

        itemMenuButtonRef.current.style.top = `${element.offsetTop}px`;
    }, []);

    const handleItemFormMouseOver = useCallback(() => {
        itemMenuButtonRef.current.style.top = '-10000px';
    }, []);

    const firstItem = exercise.items.at(0);
    const lastItem = exercise.items.at(-1);

    return (
        <PageSection
            className="ExerciseItems"
        // onMouseLeave={handleRootMouseLeave}
        >
            <Flex gap="medium" column>
                {exercise.items.map(item =>
                    editingItemId === item.id ?
                        <ExerciseItemForm
                            key={item.id}
                            id={item.id}
                            item={item}
                            onMouseOver={handleItemFormMouseOver}
                            onSubmit={handleUpdate}
                            onCancel={handleCancelEdit}
                        />
                        :
                        <div
                            key={item.id}
                            id={item.id}
                            onMouseOver={handleItemMouseOver}
                        >
                            <ExerciseItem
                                item={item}
                                state={state[item.id]}
                                onUpdateState={handleUpdateItemState}
                            />
                        </div>
                )}

                <Menu
                    trigger={
                        <Button
                            className="ExerciseItems__add-button"
                            icon="add"
                            content="Добавить элемент"
                            size="sm"
                            variant="outlined"
                        />
                    }
                    items={exerciseTypeMenuItems}
                    onItemClick={handleCreate}
                />
            </Flex>

            {exercise.items &&
                <Menu
                    trigger={
                        <IconButton
                            ref={itemMenuButtonRef}
                            className="ExerciseItems__item-menu-button"
                            icon="more_vert"
                            color="neutral"
                            size="sm"
                            variant="plain"
                        />
                    }
                    items={[
                        {
                            key: 'add_above',
                            decorator: <Icon size="small">arrow_upward</Icon>,
                            content: 'Добавить выше',
                            onItemClick: (_, { value }) => handleAdd(value, 0),
                            items: exerciseTypeMenuItems
                        },
                        {
                            key: 'add_below',
                            decorator: <Icon size="small">arrow_downward</Icon>,
                            content: 'Добавить ниже',
                            onItemClick: (_, { value }) => handleAdd(value, 1),
                            items: exerciseTypeMenuItems
                        },
                        {
                            key: 'divider-1',
                            kind: 'divider'
                        },
                        {
                            key: 'move_top',
                            decorator: <Icon size="small">keyboard_double_arrow_up</Icon>,
                            content: 'Переместить вверх',
                            disabled: firstItem?.id === activeItemId,
                            onClick: () => handleMoveTo(activeItemId, 0)
                        },
                        {
                            key: 'move_up',
                            decorator: <Icon size="small">keyboard_arrow_up</Icon>,
                            content: 'Переместить выше',
                            disabled: firstItem?.id === activeItemId,
                            onClick: () => handleMove(activeItemId, -1)
                        },
                        {
                            key: 'move_down',
                            decorator: <Icon size="small">keyboard_arrow_down</Icon>,
                            content: 'Переместить ниже',
                            disabled: lastItem?.id === activeItemId,
                            onClick: () => handleMove(activeItemId, 1)
                        },
                        {
                            key: 'move_bottom',
                            decorator: <Icon size="small">keyboard_double_arrow_down</Icon>,
                            content: 'Переместить вниз',
                            disabled: lastItem?.id === activeItemId,
                            onClick: () => handleMoveTo(activeItemId, -1)
                        },
                        {
                            key: 'divider-2',
                            kind: 'divider'
                        },
                        {
                            key: 'edit',
                            decorator: <Icon size="small">edit</Icon>,
                            content: 'Изменить',
                            onClick: handleEdit
                        },
                        {
                            key: 'delete',
                            decorator: <Icon size="small">delete</Icon>,
                            content: 'Удалить',
                            color: 'danger',
                            onClick: handleDeleteRequest
                        }
                    ]}
                />
            }

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