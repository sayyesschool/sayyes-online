import { Link as RouterLink } from 'react-router-dom';

import StatusChip from 'shared/components/status-chip';
import { LessonStatusLabel } from 'shared/data/lesson';
import { IconButton, Link, Table } from 'shared/ui-components';

export default function LessonsTable({ lessons, onEdit, onDelete }) {
    return (
        <Table className="LessonsTable">
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
                            {lesson.learner ?
                                <Link
                                    as={RouterLink}
                                    to={`/learners/${lesson.learner.id}`}
                                    content={lesson.learner.fullname}
                                    color="neutral"
                                    variant="plain"
                                    underline="none"
                                />
                                :
                                '–'
                            }
                        </Table.Cell>

                        <Table.Cell>
                            {lesson.teacher &&
                                <Link
                                    as={RouterLink}
                                    to={`/teachers/${lesson.teacher.id}`}
                                    content={lesson.teacher.fullname}
                                    color="neutral"
                                    variant="plain"
                                    underline="none"
                                />
                            }
                        </Table.Cell>

                        <Table.Cell>
                            {lesson.dateStringAbs} · {lesson.timeStringAbs}
                        </Table.Cell>

                        <Table.Cell>
                            {lesson.room?.title}
                        </Table.Cell>

                        <Table.Cell>
                            <StatusChip
                                status={lesson.status}
                                content={LessonStatusLabel[lesson.status]}
                            />
                        </Table.Cell>

                        <Table.Cell content={lesson.trial ? 'Да' : 'Нет'} />
                        <Table.Cell content={lesson.free ? 'Да' : 'Нет'} />
                        <Table.Cell content={lesson.confirmed ? 'Да' : 'Нет'} />

                        <Table.Cell align="end">
                            <IconButton.Group
                                buttons={[
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
                                        color: 'danger',
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
        key: 'learner',
        text: 'Ученик'
    },
    {
        key: 'teacher',
        text: 'Преподаватель'
    },
    {
        key: 'datetime',
        text: 'Дата и время'
    },
    {
        key: 'room',
        text: 'Аудитория'
    },
    {
        key: 'status',
        text: 'Статус'
    },
    {
        key: 'trial',
        text: 'Пробный'
    },
    {
        key: 'free',
        text: 'Бесплатный'
    },
    {
        key: 'confirmed',
        text: 'Подтвержден'
    },
    {
        key: 'actions'
    }
];