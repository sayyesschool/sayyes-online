import { Link } from 'react-router-dom';

import StatusChip from 'shared/components/status-chip';
import { Chip, IconButton, Table, Text } from 'shared/ui-components';
import { LessonStatusLabel } from 'shared/data/lesson';

export default function LessonsTable({ lessons, onView, onEdit, onDelete }) {
    return (
        <Table className="sy-LessonsTable">
            <Table.Head>
                <Table.Row header>
                    {columns.map(col =>
                        <Table.Cell
                            key={col.key}
                            content={col.text}
                            header
                        />
                    )}
                </Table.Row>
            </Table.Head>

            <Table.Body>
                {lessons.map(lesson =>
                    <Table.Row key={lesson.id}>
                        <Table.Cell>
                            {lesson.client &&
                                <Chip
                                    as={Link}
                                    to={`/clients/${lesson.client.id}`}
                                    content={lesson.client.fullname}
                                    variant="outlined"
                                />
                            }
                        </Table.Cell>

                        <Table.Cell>
                            {lesson.teacher &&
                                <Chip
                                    as={Link}
                                    to={`/teachers/${lesson.teacher.id}`}
                                    content={lesson.teacher.fullname}
                                    variant="outlined"
                                />
                            }
                        </Table.Cell>

                        <Table.Cell>
                            <StatusChip
                                status={lesson.status}
                                content={LessonStatusLabel[lesson.status]}
                            />
                        </Table.Cell>

                        <Table.Cell>
                            <Text>{lesson.dateString}</Text>
                            <Text type="body2">{lesson.timeString}</Text>
                        </Table.Cell>

                        <Table.Cell content={lesson.trial ? 'Да' : 'Нет'} />

                        <Table.Cell content={lesson.free ? 'Да' : 'Нет'} />

                        <Table.Cell>
                            <IconButton.Group
                                buttons={[
                                    {
                                        key: 'view',
                                        title: 'Посмотреть',
                                        icon: 'preview',
                                        onClick: () => onView(lesson)
                                    },
                                    {
                                        key: 'edit',
                                        title: 'Изменить',
                                        icon: 'edit',
                                        onClick: () => onEdit(lesson)
                                    },
                                    {
                                        key: 'delete',
                                        title: 'Удалить',
                                        icon: 'delete',
                                        onClick: () => onDelete(lesson)
                                    }
                                ]}
                                size="sm"
                                color="neutral"
                                variant="plain"
                                align="end"
                            />
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
}

const columns = [
    {
        key: 'client',
        text: 'Клиент'
    },
    {
        key: 'teacher',
        text: 'Преподаватель'
    },
    {
        key: 'status',
        text: 'Статус'
    },
    {
        key: 'datetime',
        text: 'Дата и время'
    },
    {
        key: 'trial',
        text: 'Пробное'
    },
    {
        key: 'free',
        text: 'Бесплатное'
    },
    {
        key: 'actions'
    }
];