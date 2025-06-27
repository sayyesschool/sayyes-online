import { Link as RouterLink } from 'react-router-dom';

import ConfirmButton from 'shared/components/confirm-button';
import Content from 'shared/components/content';
import { RefEntityLabel, RefLinkLabel } from 'shared/data/common';
import {
    Chip,
    Flex,
    IconButton,
    Link,
    Table,
    Text
} from 'shared/ui-components';

import PriorityChip from 'crm/components/tasks/priority-chip';
import TaskComment from 'crm/components/tasks/task-comment';

const columns = [
    {
        key: 'main',
        content: (
            <Flex
                spacing={0} alignItems="center"
                column
            >
                <span>Тема</span>
                <span>Приоритет</span>
                <span>Исполнитель</span>
                <span>Связь</span>
            </Flex>
        )
    },
    {
        key: 'second',
        content: (
            <Flex
                spacing={1} alignItems="center"
                column
            >
                <span>Статус</span>
                <span>Истекает</span>
                <span>Напоминание</span>
            </Flex>
        )
    },
    {
        key: 'note',
        content: (
            <Flex
                spacing={1} alignItems="center"
                column
            >
                <Text align="center" type="body-md">
                    Описание
                </Text>

                <Text align="center" type="body-md">
                    Комментарии
                </Text>
            </Flex>
        )
    },
    {
        key: 'actions',
        content: (
            <Text align="center" type="body-md">
                Действия
            </Text>
        )
    }
];

export default function TasksTable({ user, tasks, onEdit, onDelete }) {
    return (
        <Table borderAxis="bothBetween">
            <Table.Head>
                <Table.Row header>
                    {columns.map(column => (
                        <Table.Cell
                            key={column.key}
                            style={{ verticalAlign: 'middle' }}
                            header
                        >
                            {column.content}
                        </Table.Cell>
                    ))}
                </Table.Row>
            </Table.Head>

            <Table.Body>
                {tasks.map(task => (
                    <Table.Row key={task.id}>
                        <Table.Cell align="center" width="130px">
                            <Flex
                                gap="smaller" align="center"
                                column
                            >
                                <Text color="primary" type="body-md">
                                    {task.themeLabel}
                                </Text>

                                <PriorityChip
                                    status={task.priority}
                                    content={task.priorityLabel}
                                />

                                <Link
                                    component={RouterLink}
                                    to={`/managers/${task.manager?.id}`}
                                >
                                    <Chip
                                        color={user.id === task.manager?.id ? 'primary' : 'neutral'}
                                        content={
                                            user.id === task.manager?.id
                                                ? 'Я'
                                                : task.manager?.firstname
                                        }
                                    />
                                </Link>

                                {task.refs?.length ? (
                                    task.refs.map(ref => (
                                        <Link
                                            key={ref.id}
                                            component={RouterLink}
                                            to={`/${RefLinkLabel[ref.entity]}/${ref.id}`}
                                        >
                                            <Chip content={RefEntityLabel[ref.entity]} />
                                        </Link>
                                    ))
                                ) : (
                                    <Chip content={'Нет связей'} />
                                )}
                            </Flex>
                        </Table.Cell>

                        <Table.Cell width="160px">
                            <Flex
                                gap="smaller" align="center"
                                column
                            >
                                <Chip
                                    color={task.completed ? 'neutral' : 'primary'}
                                    content={task.completed ? 'Закрыт' : 'Открыт'}
                                />

                                {task.dueDateLabel.date ? (
                                    <Flex align="center" gap="smaller">
                                        <Text>{task.dueDateLabel.date}</Text>
                                        <Text type="body-xs">{task.dueDateLabel.time}</Text>
                                    </Flex>
                                ) : (
                                    <Chip content={task.dueDateLabel.noDate} />
                                )}

                                {task.remindDateLabel.date ? (
                                    <Flex align="center" gap="smaller">
                                        <Text>{task.remindDateLabel.date}</Text>
                                        <Text type="body-xs">{task.remindDateLabel.time}</Text>
                                    </Flex>
                                ) : (
                                    <Chip content={task.remindDateLabel.noDate} />
                                )}
                            </Flex>
                        </Table.Cell>

                        <Table.Cell>
                            <Flex
                                gap="smaller" align="center"
                                column
                            >
                                {task.note ? (
                                    <Content content={task.note} html />
                                ) : (
                                    <Chip content={'Без описания'} />
                                )}

                                {task.lastComment ? (
                                    <TaskComment
                                        user={user}
                                        comment={task.lastComment}
                                        readOnly
                                    />
                                ) : (
                                    <Chip content={'Без комментариев'} />
                                )}
                            </Flex>
                        </Table.Cell>

                        <Table.Cell align="center" width="80px">
                            <IconButton.Group>
                                <Flex column>
                                    <IconButton
                                        title="Открыть"
                                        icon="file_open"
                                        as="a"
                                        href={`/tasks/${task.id}`}
                                    />

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
                                </Flex>
                            </IconButton.Group>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}