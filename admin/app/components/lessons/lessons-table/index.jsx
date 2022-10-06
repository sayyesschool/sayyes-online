import { Link } from 'react-router-dom';
import { Button, Pill, Table } from '@fluentui/react-northstar';

import Icon from 'shared/ui-components/icon';
import StatusLabel from 'shared/components/status-label';

export default function LessonsTable({ lessons, onView, onEdit, onDelete }) {
    return (
        <Table id="lesson-table">
            <Table.Row header>
                {columns.map(col =>
                    <Table.Cell
                        key={col.key}
                        content={col.text}
                    />
                )}
            </Table.Row>

            {lessons.map(lesson =>
                <Table.Row key={lesson.id}>
                    <Table.Cell
                        content={lesson.client &&
                            <Pill
                                as={Link}
                                to={`/clients/${lesson.client.id}`}
                                content={lesson.client.fullname}
                                appearance="outline"
                            />
                        }
                    />

                    <Table.Cell
                        content={lesson.teacher &&
                            <Pill
                                as={Link}
                                to={`/teachers/${lesson.teacher.id}`}
                                content={lesson.teacher.fullname}
                                appearance="outline"
                            />
                        }
                    />

                    <Table.Cell
                        content={
                            <StatusLabel
                                status={lesson.status}
                                content={lesson.statusLabel}
                            />
                        }
                    />

                    <Table.Cell content={lesson.dateTimeLabel} />

                    <Table.Cell content={lesson.trial ? 'Да' : 'Нет'} />

                    <Table.Cell content={lesson.free ? 'Да' : 'Нет'} />

                    <Table.Cell
                        content={
                            <Button.Group
                                buttons={[
                                    {
                                        key: 'view',
                                        title: 'Посмотреть',
                                        icon: <Icon>preview</Icon>,
                                        iconOnly: true,
                                        text: true,
                                        onClick: () => onView(lesson)
                                    },
                                    {
                                        key: 'edit',
                                        title: 'Изменить',
                                        icon: <Icon>edit</Icon>,
                                        iconOnly: true,
                                        text: true,
                                        onClick: () => onEdit(lesson)
                                    },
                                    {
                                        key: 'delete',
                                        title: 'Удалить',
                                        icon: <Icon>delete</Icon>,
                                        iconOnly: true,
                                        text: true,
                                        onClick: () => onDelete(lesson)
                                    }
                                ]}
                            />
                        }
                    />
                </Table.Row>
            )}
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