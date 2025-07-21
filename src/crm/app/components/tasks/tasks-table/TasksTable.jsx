import { Link as RouterLink } from 'react-router-dom';

import Comment from 'shared/components/comment';
import ConfirmButton from 'shared/components/confirm-button';
import Content from 'shared/components/content';
import { RefEntityLabel as EntityRefLabel } from 'shared/data/common';
import { PriorityColor, PriorityLabel } from 'shared/data/task';
import {
    Chip,
    Flex,
    IconButton,
    Table
} from 'shared/ui-components';
import { Badge, Checkbox } from 'shared/ui-components';

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
                        <Table.Cell>
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
                                    <Chip
                                        title="Тема"
                                        content={task.topicLabel}
                                        size="sm"
                                    />

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
                                                    : task.assignee?.firstname
                                            }
                                            color={task.assignee?.id === user.id ? 'primary' : 'neutral'}
                                            size="sm"
                                        />
                                    }

                                    {task.dueDate && (
                                        <Chip
                                            title="Срок"
                                            icon="today"
                                            content={task.dueDateLabel}
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
                                            // as={RouterLink}
                                            // to={`/${ref.entity}s/${ref.id}`}
                                            content={EntityRefLabel[ref.entity]}
                                        />
                                    ))}
                                </Flex>
                            </Flex>
                        </Table.Cell>

                        <Table.Cell>
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

                        <Table.Cell align="end">
                            <IconButton.Group>
                                <Badge
                                    content={task.comments.length > 0 ? task.comments.length : undefined}
                                    inset="10%"
                                    size="sm"
                                    variant="plain"
                                >
                                    <IconButton
                                        icon="comment"
                                    />
                                </Badge>

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