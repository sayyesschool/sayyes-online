import { useCallback } from 'react';
import { Button, MenuButton } from '@fluentui/react-northstar';
import classnames from 'classnames';

import Icon from 'shared/components/icon';

import ExerciseItem from 'shared/components/exercise-item';
import ExerciseItemForm from 'app/components/courses/exercise-item-form';
import { exerciseTypeMenuItems } from 'shared/data/exercise';

import './index.scss';

export default function ExerciseItemWrapper({ index, item, editing, isFirst, isLast, onEdit, onUpdate, onAdd, onMove, onDelete }) {
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
        <div id={item.id} className={classnames('exercise-item-wrapper', {
            'exercise-item-wrapper--editing': editing
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
                        className="exercise-item-wrapper__menu-button"
                        trigger={
                            <Button
                                size="small"
                                icon={<Icon>more_vert</Icon>}
                                iconOnly
                                text
                            />
                        }
                        align="end"
                        on="hover"
                        menu={[
                            {
                                key: 'add_above',
                                icon: <Icon>keyboard_arrow_up</Icon>,
                                content: 'Добавить элемент выше',
                                indicator: <Icon>chevron_right</Icon>,
                                menu: {
                                    items: exerciseTypeMenuItems,
                                    onItemClick: handleAddAbove
                                }
                            }, {
                                key: 'add_below',
                                icon: <Icon>keyboard_arrow_down</Icon>,
                                content: 'Добавить элемент ниже',
                                indicator: <Icon>chevron_right</Icon>,
                                menu: {
                                    items: exerciseTypeMenuItems,
                                    onItemClick: handleAddBelow
                                }
                            },
                            {
                                key: 'divider-1',
                                kind: 'divider'
                            },
                            {
                                key: 'move_up',
                                icon: <Icon>arrow_upward</Icon>,
                                content: 'Переместить выше',
                                disabled: isFirst,
                                onClick: handleMoveUp
                            },
                            {
                                key: 'move_down',
                                icon: <Icon>arrow_downward</Icon>,
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
                                icon: <Icon>edit</Icon>,
                                content: 'Изменить',
                                onClick: handleEdit
                            },
                            {
                                key: 'delete',
                                icon: <Icon>delete</Icon>,
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