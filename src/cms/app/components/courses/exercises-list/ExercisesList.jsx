import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import Content from 'shared/components/content';
import { Avatar, Flex, Icon, IconButton, Menu, Surface } from 'shared/ui-components';

export default function ExercisesList({
    exercises,
    onReorder,
    onDelete
}) {
    const handleMoveTo = useCallback((from, to) => {
        const copy = exercises.slice();
        const items = copy.splice(from, 1);

        if (to === 0) { // top
            copy.unshift(...items);
        } else if (to === -1) { // bottom
            copy.push(...items);
        }

        onReorder(copy);
    }, [exercises, onReorder]);

    const handleMove = useCallback((index, dir) => {
        const copy = exercises.slice();
        const otherIndex = index + dir;
        const item = copy[index];
        const otherItem = copy[otherIndex];

        copy[otherIndex] = item;
        copy[index] = otherItem;

        onReorder(copy);
    }, [exercises, onReorder]);

    const handleDelete = useCallback(exercise => {
        onDelete(exercise);
    }, [onDelete]);

    return (
        <div className="ExercisesList">
            <Flex gap="medium" column>
                {exercises.map((exercise, index) =>
                    <Surface
                        key={exercise.id}
                        padding="md"
                        shadow="xs"
                        radius="lg"
                    >
                        <Flex gap="small" alignItems="flex-start">
                            <Flex
                                component={Link}
                                to={exercise.url}
                                flex="1"
                                gap="medium"
                                alignItems="center"
                            >
                                <Avatar content={index + 1} size="sm" />
                                <Content content={exercise.description} html />
                            </Flex>

                            <Menu
                                trigger={
                                    <IconButton
                                        icon="more_vert"
                                        color="neutral"
                                        size="sm"
                                        variant="plain"
                                    />
                                }
                                items={[
                                    {
                                        key: 'move-top',
                                        decorator: <Icon name="keyboard_double_arrow_up" />,
                                        content: 'Поднять вверх',
                                        disabled: index === 0,
                                        onClick: () => handleMoveTo(index, 0)
                                    },
                                    {
                                        key: 'move-up',
                                        decorator: <Icon name="keyboard_arrow_up" />,
                                        content: 'Поднять выше',
                                        disabled: index === 0,
                                        onClick: () => handleMove(index, -1)
                                    },
                                    {
                                        key: 'move-down',
                                        decorator: <Icon name="keyboard_arrow_down" />,
                                        content: 'Опустить ниже',
                                        disabled: index === exercises.length - 1,
                                        onClick: () => handleMove(index, 1)
                                    },
                                    {
                                        key: 'move-bottom',
                                        decorator: <Icon name="keyboard_double_arrow_down" />,
                                        content: 'Опустить вниз',
                                        disabled: index === exercises.length - 1,
                                        onClick: () => handleMoveTo(index, -1)
                                    },
                                    {
                                        key: 'delete',
                                        decorator: <Icon name="delete" />,
                                        content: 'Удалить',
                                        color: 'danger',
                                        onClick: () => handleDelete(exercise)
                                    }
                                ]}
                            />
                        </Flex>
                    </Surface>
                )}
            </Flex>
        </div>
    );
}