import { Link as RouterLink } from 'react-router-dom';

import Comment from 'shared/components/comment';
import ConfirmButton from 'shared/components/confirm-button';
import Content from 'shared/components/content';
import { RefEntityLabel as EntityRefLabel } from 'shared/data/common';
import { PriorityColor, PriorityLabel } from 'shared/data/task';
import { isBeforeToday, isToday } from 'shared/libs/datetime';
import {
    Chip,
    Flex,
    Icon,
    IconButton,
    Table
} from 'shared/ui-components';
import { Checkbox } from 'shared/ui-components';

const columns = [
    { key: 'task', content: 'Задача' },
    { key: 'comment', content: 'Последний комментарий', width: '40%' },
    { key: 'actions', content: 'Действия' }
];

export default function TasksTable({
    tasks,
    user,
    showRefs = false,
    onCheck,
    onEdit,
    onDelete
}) {
    return (
        <Table borderAxis="bothBetween">
            <Table.Head>
                <Table.Row header>
                    {columns.map(col =>
                        <Table.Cell
                            key={col.key}
                            header
                            {...col}
                        />
                    )}
                </Table.Row>
            </Table.Head>

            <Table.Body>
                {tasks.map(task => (
                    <Table.Row key={task.id}>
                        <Table.Cell alignV="start">
                            <Flex
                                gap="smaller"
                                column
                            >
                                {task.description && (
                                    <Flex align="center" gap="s">
                                        <Checkbox
                                            checked={task.completed}
                                            onChange={() => onCheck(task)}
                                        />

                                        <Content content={task.description} html />
                                    </Flex>
                                )}

                                <Flex
                                    align="center"
                                    gap="smaller"
                                    sx={{ marginLeft: '30px' }}
                                >
                                    {task.topic &&
                                        <Chip
                                            title="Тема"
                                            content={task.topicLabel}
                                            size="sm"
                                        />
                                    }

                                    <Chip
                                        title="Приоритет"
                                        content={PriorityLabel[task.priority]}
                                        color={PriorityColor[task.priority]}
                                        size="sm"
                                    />

                                    {task.assignee &&
                                        <Chip
                                            title="Исполнитель"
                                            slotProps={{
                                                action: {
                                                    component: RouterLink,
                                                    to: task.assignee?.url
                                                }
                                            }}
                                            content={
                                                user.id === task.assignee?.id
                                                    ? 'Я'
                                                    : task.assignee?.fullname
                                            }
                                            color={task.assignee?.id === user.id ? 'primary' : 'neutral'}
                                            size="sm"
                                        />
                                    }

                                    {task.dueDate && (
                                        <Chip
                                            title="Срок"
                                            start={<Icon name="today" size="xs" />}
                                            content={task.dueDateLabel}
                                            end={isBeforeToday(task.dueDate) ? <Icon name="error" size="xs" /> : undefined}
                                            color={isToday(task.dueDate) ? 'primary' : (isBeforeToday(task.dueDate) ? 'danger' : undefined)}
                                            size="sm"
                                        />
                                    )}

                                    {task.reminderDate && (
                                        <Chip
                                            title="Напоминание"
                                            icon="alarm"
                                            content={task.reminderDateLabel}
                                            size="sm"
                                        />
                                    )}

                                    {showRefs && task.refs?.map(ref => (
                                        <Chip
                                            key={ref.id}
                                            slotProps={{
                                                action: {
                                                    component: RouterLink,
                                                    to: `/${ref.entity}s/${ref.id}`
                                                }
                                            }}
                                            as={RouterLink}
                                            to={`/${ref.entity}s/${ref.id}`}
                                            content={EntityRefLabel[ref.entity]}
                                            size="sm"
                                        />
                                    ))}

                                    {task.comments.length > 0 &&
                                        <Chip
                                            start={<Icon name="comment" size="xs" />}
                                            content={task.comments.length}
                                            size="sm"
                                        />
                                    }
                                </Flex>
                            </Flex>
                        </Table.Cell>

                        <Table.Cell alignV="start">
                            {task.lastComment && (
                                <Comment
                                    user={user}
                                    comment={task.lastComment}
                                    size="sm"
                                    noAuthor
                                    readOnly
                                />
                            )}
                        </Table.Cell>

                        <Table.Cell align="end" alignV="start">
                            <IconButton.Group>
                                <IconButton
                                    title="Изменить"
                                    icon="edit"
                                    onClick={() => onEdit(task)}
                                />

                                <ConfirmButton
                                    title="Удалить"
                                    message="Удалить задачу?"
                                    icon="delete"
                                    color="danger"
                                    onConfirm={() => onDelete(task.id)}
                                />
                            </IconButton.Group>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}