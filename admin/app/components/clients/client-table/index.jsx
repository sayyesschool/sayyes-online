import React from 'react';
import { Link } from 'react-router-dom';
import {
    DataTable
} from 'mdc-react';

import MenuButton from 'app/components/shared/menu-button';

export default function ClientTable({ clients, onEdit, onDelete }) {
    return (
        <DataTable className="client-table">
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
                {clients.map(client =>
                    <DataTable.Row key={client.id}>
                        <DataTable.Cell>
                            <Link to={`/clients/${client.id}`}>{client.fullname}</Link>
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {client.email}
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {client.phone}
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {client.birthdate &&
                                `${client.birthdate} (${client.age})`
                            }
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {client.timezone}
                        </DataTable.Cell>

                        <DataTable.Cell numeric>
                            <MenuButton
                                items={[
                                    {
                                        key: 'edit',
                                        text: 'Изменить',
                                        onClick: () => onEdit(client)
                                    },
                                    {
                                        key: 'delete',
                                        text: 'Удалить',
                                        onClick: () => onDelete(client)
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