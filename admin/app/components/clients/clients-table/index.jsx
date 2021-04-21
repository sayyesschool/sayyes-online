import React from 'react';
import { Link } from 'react-router-dom';
import {
    DataTable,
    Icon
} from 'mdc-react';

import MenuButton from 'shared/components/menu-button';

export default function ClientsTable({ clients, onEdit, onDelete }) {
    return (
        <DataTable className="clients-table">
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

                        <DataTable.Cell numeric>
                            <MenuButton
                                items={[
                                    {
                                        key: 'edit',
                                        text: 'Изменить',
                                        graphic: <Icon>edit</Icon>,
                                        onClick: () => onEdit(client)
                                    },
                                    {
                                        key: 'delete',
                                        text: 'Удалить',
                                        graphic: <Icon>delete</Icon>,
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
    }
];