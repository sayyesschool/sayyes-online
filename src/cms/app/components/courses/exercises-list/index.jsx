import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import Content from 'shared/components/content';
import { Avatar, Card, Flex, Icon, IconButton, MenuButton } from 'shared/ui-components';

export default function ExercisesList({
    exercises,
    onReorder,
    onDelete
}) {
    const handleMoveUp = useCallback(index => {
        onReorder(index, -1);
    }, [onReorder]);

    const handleMoveDown = useCallback(index => {
        onReorder(index, 1);
    }, [onReorder]);

    const handleDelete = useCallback(exercise => {
        onDelete(exercise);
    }, [onDelete]);

    return (
        <div className="ExercisesList">
            <Flex gap="medium" column>
                {exercises.map((exercise, index) =>
                    <Card
                        key={exercise.id}
                        className="ExerciseCard"
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

                            <MenuButton
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
                                        decorator: <Icon name="arrow_upward" />,
                                        content: 'Поднять',
                                        disabled: index === 0,
                                        onClick: () => handleMoveUp(index)
                                    },
                                    {
                                        key: 'move-down',
                                        decorator: <Icon name="arrow_downward" />,
                                        content: 'Опустить',
                                        disabled: index === exercises.length - 1,
                                        onClick: () => handleMoveDown(index)
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
                    </Card>
                )}
            </Flex>
        </div>
    );
}