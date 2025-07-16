import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import Content from 'shared/components/content';
import { Avatar, Flex, Icon, IconButton, Menu, Surface } from 'shared/ui-components';

export default function ExercisesList({
    exercises,
    onReorder,
    onDelete
}) {
    const handleMoveToTop = useCallback(index => {
        onReorder(index, 0);
    }, [onReorder]);

    const handleMoveUp = useCallback(index => {
        onReorder(index, index - 1);
    }, [onReorder]);

    const handleMoveDown = useCallback(index => {
        onReorder(index, index + 1);
    }, [onReorder]);

    const handleMoveToBottom = useCallback(index => {
        onReorder(index, exercises.length - 1);
    }, [exercises.length, onReorder]);

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
                                        key: 'move-up',
                                        decorator: <Icon name="keyboard_double_arrow_up" />,
                                        content: 'Поднять вверх',
                                        disabled: index === 0,
                                        onClick: () => handleMoveToTop(index)
                                    },
                                    {
                                        key: 'move-up',
                                        decorator: <Icon name="keyboard_arrow_up" />,
                                        content: 'Поднять выше',
                                        disabled: index === 0,
                                        onClick: () => handleMoveUp(index)
                                    },
                                    {
                                        key: 'move-down',
                                        decorator: <Icon name="keyboard_arrow_down" />,
                                        content: 'Опустить ниже',
                                        disabled: index === exercises.length - 1,
                                        onClick: () => handleMoveDown(index)
                                    },
                                    {
                                        key: 'move-down',
                                        decorator: <Icon name="keyboard_double_arrow_down" />,
                                        content: 'Опустить вниз',
                                        disabled: index === exercises.length - 1,
                                        onClick: () => handleMoveToBottom(index)
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