import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
    DataTable
} from 'mdc-react';

import MenuButton from 'shared/components/menu-button';

import DataContext from 'app/contexts/data';

export default function TeachersTable({ teachers, onEdit, onDelete }) {
    const data = useContext(DataContext);

    return (
        <DataTable className="teachers-table">
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
                {teachers.map(teacher =>
                    <DataTable.Row key={teacher.id}>
                        <DataTable.Cell>
                            <Link to={`/teachers/${teacher.id}`}>{teacher.fullname}</Link>
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {teacher.email}
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {teacher.phone}
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {teacher.timezone ? data.timezones.get(teacher.timezone) : '[Не указан]'}
                        </DataTable.Cell>

                        <DataTable.Cell numeric>
                            <MenuButton
                                items={[
                                    {
                                        key: 'edit',
                                        text: 'Изменить',
                                        onClick: () => onEdit(teacher)
                                    },
                                    {
                                        key: 'delete',
                                        text: 'Удалить',
                                        onClick: () => onDelete(teacher)
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
        key: 'fullname',
        text: 'Имя и фамилия'
    },
    {
        key: 'email',
        text: 'Email'
    },
    {
        key: 'phone',
        text: 'Телефон'
    },
    {
        key: 'timezone',
        text: 'Часовой пояс'
    },
];