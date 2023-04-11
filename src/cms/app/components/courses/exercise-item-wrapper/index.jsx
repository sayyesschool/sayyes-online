import { useCallback } from 'react';
import classnames from 'classnames';

import ExerciseItem from 'shared/components/exercise-item';
import { IconButton, Icon, MenuButton } from 'shared/ui-components';
import { exerciseTypeMenuItems } from 'shared/data/exercise';

import ExerciseItemForm from 'app/components/courses/exercise-item-form';

import './index.scss';

export default function ExerciseItemWrapper({
    index,
    item,
    editing,
    isFirst,
    isLast,
    onEdit,
    onUpdate,
    onAdd,
    onMove,
    onDelete
}) {
    const handleEdit = useCallback(() => {
        onEdit(item.id);
    }, [item, onEdit]);

    const handleCancel = useCallback(() => {
        onEdit();
    }, [onEdit]);

    const handleUpdate = useCallback(data => {
        return onUpdate(item.id, data);
    }, [item, onUpdate]);

    const handleDelete = useCallback(() => {
        let file;

        if (item.image?.url) {
            file = {
                url: item.image.url
            };
        }

        if (item.audio?.url) {
            file = {
                url: item.audio.url
            };
        }

        onDelete({
            id: item.id,
            file
        });
    }, [item, onDelete]);

    const handleAddAbove = useCallback((event, component) => {
        console.log(event, component);
        onAdd(component.value, index);
    }, [index, onAdd]);

    const handleAddBelow = useCallback((event, component) => {
        onAdd(component.value, index + 1);
    }, [index, onAdd]);

    const handleMoveUp = useCallback(() => {
        onMove(index, -1);
    }, [index, onMove]);

    const handleMoveDown = useCallback(() => {
        onMove(index, 1);
    }, [index, onMove]);

    return (
        <div id={item.id} className={classnames('ExerciseItemWrapper', {
            'ExerciseItemWrapper--editing': editing
        })}>
            {editing ?
                <ExerciseItemForm
                    id="exercise-item-form"
                    item={item}
                    onCancel={handleCancel}
                    onSubmit={handleUpdate}
                />
                :
                <>
                    <ExerciseItem
                        id={undefined}
                        item={item}
                    />

                    <MenuButton
                        trigger={
                            <IconButton
                                className="ExerciseItemWrapper__menu-button"
                                icon="more_vert"
                                color="neutral"
                                size="sm"
                                variant="plain"
                            />
                        }
                        items={[
                            {
                                key: 'add_above',
                                content: 'Добавить выше',
                                onItemClick: handleAddAbove,
                                items: exerciseTypeMenuItems
                            },
                            {
                                key: 'add_below',
                                content: 'Добавить ниже',
                                onItemClick: handleAddBelow,
                                items: exerciseTypeMenuItems
                            },
                            {
                                key: 'divider-1',
                                kind: 'divider'
                            },
                            {
                                key: 'move_up',
                                decorator: <Icon>arrow_upward</Icon>,
                                content: 'Переместить выше',
                                disabled: isFirst,
                                onClick: handleMoveUp
                            },
                            {
                                key: 'move_down',
                                decorator: <Icon>arrow_downward</Icon>,
                                content: 'Переместить ниже',
                                disabled: isLast,
                                onClick: handleMoveDown
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
                                onClick: handleDelete
                            }
                        ]}
                    />
                </>
            }
        </div>
    );
}