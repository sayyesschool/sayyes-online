import { useCallback, useEffect, useRef, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import ExerciseItem from 'shared/components/exercise-item';
import PageSection from 'shared/components/page-section';
import { Button, Flex, Icon, IconButton, MenuButton } from 'shared/ui-components';

import ExerciseItemForm from 'app/components/courses/exercise-item-form';

import './index.scss';

import { exerciseTypeMenuItems } from 'shared/data/exercise';

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
    }, []);

    const handleAdd = useCallback((type, dir) => {
        const activeItemIndex = exercise.items.findIndex(item => item.id === activeItemId);

        return onCreate({
            data: { type },
            position: activeItemIndex + dir
        }).then(response => setEditingItemId(response.data.item.id));
    }, [exercise, activeItemId]);

    const handleUpdate = useCallback(data => {
        console.log('handleUpdate', editingItemId, data);
        return onUpdate(editingItemId, data)
            .then(() => setEditingItemId(undefined));
    }, [editingItemId]);

    const handleDelete = useCallback(() => {
        const deletingItem = exercise.items.find(item => item.id === activeItemId);

        if (!deletingItem) return;

        if (deletingItem.image?.url) {
            deletingItem.file = {
                url: item.image.url
            };
        }

        if (deletingItem.audio?.url) {
            deletingItem.file = {
                url: item.audio.url
            };
        }

        return onDelete(deletingItem.id, deletingItem)
            .then(() => {
                setActiveItemId(undefined);
                toggleConfirmationDialogOpen(false);
            });
    }, [exercise, activeItemId]);

    const handleDeleteRequest = useCallback(() => {
        toggleConfirmationDialogOpen(true);
    }, []);

    const handleMove = useCallback((itemId, dir) => {
        const itemIndex = exercise.items.findIndex(item => item.id === itemId);
        const items = exercise.items.slice();
        const item = items[itemIndex];
        const otherItem = items[itemIndex + dir];

        items[itemIndex + dir] = item;
        items[itemIndex] = otherItem;

        onReorder({ items });
    }, [exercise]);

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

    console.log(state);

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
                        <div key={item.id} id={item.id} onMouseOver={handleItemMouseOver}>
                            <ExerciseItem
                                item={item}
                                state={state[item.id]}
                                onUpdateState={handleUpdateItemState}
                            />
                        </div>
                )}

                <MenuButton
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
                    onMenuItemClick={handleCreate}
                />
            </Flex>

            {exercise.items &&
                <MenuButton
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
                            decorator: <Icon>arrow_upward</Icon>,
                            content: 'Добавить выше',
                            onItemClick: (_, { value }) => handleAdd(value, 0),
                            items: exerciseTypeMenuItems
                        },
                        {
                            key: 'add_below',
                            decorator: <Icon>arrow_downward</Icon>,
                            content: 'Добавить ниже',
                            onItemClick: (_, { value }) => handleAdd(value, 1),
                            items: exerciseTypeMenuItems
                        },
                        {
                            key: 'divider-1',
                            kind: 'divider'
                        },
                        {
                            key: 'move_up',
                            decorator: <Icon>move_up</Icon>,
                            content: 'Переместить выше',
                            disabled: firstItem?.id === activeItemId,
                            onClick: () => handleMove(activeItemId, -1)
                        },
                        {
                            key: 'move_down',
                            decorator: <Icon>move_down</Icon>,
                            content: 'Переместить ниже',
                            disabled: lastItem?.id === activeItemId,
                            onClick: () => handleMove(activeItemId, 1)
                        },
                        {
                            key: 'divider-2',
                            kind: 'divider'
                        },
                        {
                            key: 'edit',
                            decorator: <Icon>edit</Icon>,
                            content: 'Изменить',
                            onClick: handleEdit
                        },
                        {
                            key: 'delete',
                            decorator: <Icon>delete</Icon>,
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