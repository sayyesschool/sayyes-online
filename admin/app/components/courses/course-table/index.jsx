import React from 'react';
import { Link } from 'react-router-dom';
import {
    DataTable
} from 'mdc-react';

import MenuButton from 'app/components/shared/menu-button';

export default function CourseTable({ courses, onEdit, onDelete }) {
    return (
        <DataTable id="course-table">
            <DataTable.Header>
                <DataTable.HeaderRow>
                    {columns.map(col =>
                        <DataTable.HeaderCell key={col.key}>
                            {col.text}
                        </DataTable.HeaderCell>
                    )}
                </DataTable.HeaderRow>
            </DataTable.Header>

            <DataTable.Content>
                {courses.map(course =>
                    <DataTable.Row key={course.id}>
                        <DataTable.Cell>
                            <Link to={course.uri}>{course.title}</Link>
                        </DataTable.Cell>

                        <DataTable.Cell numeric>
                            <MenuButton
                                items={[
                                    {
                                        key: 'edit',
                                        text: 'Изменить',
                                        onClick: () => onEdit(course)
                                    },
                                    {
                                        key: 'delete',
                                        text: 'Удалить',
                                        onClick: () => onDelete(course)
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
        key: 'title',
        text: 'Название'
    },
    {
        key: 'actions'
    }
];