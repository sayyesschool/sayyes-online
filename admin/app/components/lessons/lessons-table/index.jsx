import React from 'react';
import { Link } from 'react-router-dom';
import {
    Chip,
    Icon,
    DataTable
} from 'mdc-react';

import MenuButton from 'shared/components/menu-button';

export default function LessonTable({ lessons, onView, onEdit, onDelete }) {
    return (
        <DataTable id="lesson-table">
            <DataTable.Header>
                <DataTable.HeaderRow>
                    {columns.map(col =>
                        <DataTable.HeaderCell
                            key={col.key}
                        >
                            {col.text}
                        </DataTable.HeaderCell>
                    )}
                </DataTable.HeaderRow>
            </DataTable.Header>

            <DataTable.Content>
                {lessons.map(lesson =>
                    <DataTable.Row key={lesson.id}>
                        <DataTable.Cell>
                            <Chip
                                leadingIcon={<Icon>{lesson.statusIcon}</Icon>}
                                text={lesson.statusLabel}
                                outlined
                            />
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {lesson.datetime}
                        </DataTable.Cell>

                        <DataTable.Cell>
                            <Chip
                                component={Link}
                                to={`/clients/${lesson.client.id}`}
                                text={lesson.client.fullname}
                            />
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {lesson.teacher &&
                                <Chip
                                    component={Link}
                                    to={`/teachers/${lesson.teacher.id}`}
                                    text={lesson.teacher.fullname}
                                />
                            }
                        </DataTable.Cell>

                        <DataTable.Cell numeric>
                            <MenuButton
                                items={[
                                    {
                                        key: 'view',
                                        text: 'Посмотреть',
                                        onClick: () => onView(lesson)
                                    },
                                    {
                                        key: 'edit',
                                        text: 'Изменить',
                                        onClick: () => onEdit(lesson)
                                    },
                                    {
                                        key: 'delete',
                                        text: 'Удалить',
                                        onClick: () => onDelete(lesson)
                                    }
                                ]}
                            />
                        </DataTable.Cell>
                    </DataTable.Row>
                )}
            </DataTable.Content>
        </DataTable>
    );
}

const columns = [
    {
        key: 'status',
        text: 'Статус'
    },
    {
        key: 'datetime',
        text: 'Дата и время'
    },
    {
        key: 'client',
        text: 'Клиент'
    },
    {
        key: 'teacher',
        text: 'Преподаватель'
    }
];