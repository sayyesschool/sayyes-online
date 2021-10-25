import { Link } from 'react-router-dom';
import {
    DataTable
} from 'mdc-react';

import MenuButton from 'shared/components/menu-button';

export default function ManagersTable({ managers, onEdit, onDelete }) {
    return (
        <DataTable className="managers-table">
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
                {managers.map(manager =>
                    <DataTable.Row key={manager.id}>
                        <DataTable.Cell>
                            <Link to={`/managers/${manager.id}`}>{manager.fullname}</Link>
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {manager.email}
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {manager.phone}
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {manager.birthdate &&
                                `${manager.birthdate} (${manager.age})`
                            }
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {manager.timezone}
                        </DataTable.Cell>

                        <DataTable.Cell numeric>
                            <MenuButton
                                items={[
                                    {
                                        key: 'edit',
                                        text: 'Изменить',
                                        onClick: () => onEdit(manager)
                                    },
                                    {
                                        key: 'delete',
                                        text: 'Удалить',
                                        onClick: () => onDelete(manager)
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
        key: 'dob',
        text: 'День рождения'
    },
    {
        key: 'timezone',
        text: 'Часовой пояс'
    },
];