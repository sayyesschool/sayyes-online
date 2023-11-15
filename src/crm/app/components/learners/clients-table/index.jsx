import { Link as RouterLink } from 'react-router-dom';

import { IconButton, Link, Table } from 'shared/ui-components';

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
        key: 'actions'
    }
];

export default function ClientsTable({ clients, onEdit, onDelete }) {
    return (
        <Table className="ClientsTable">
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
                {clients.map(client =>
                    <Table.Row key={client.id}>
                        <Table.Cell>
                            <Link component={RouterLink} to={`/clients/${client.id}`}>{client.fullname}</Link>
                        </Table.Cell>

                        <Table.Cell content={client.email} />

                        <Table.Cell content={client.phone} />

                        <Table.Cell align="end">
                            <IconButton.Group
                                buttons={[
                                    {
                                        key: 'edit',
                                        content: 'Изменить',
                                        icon: 'edit',
                                        onClick: () => onEdit(client)
                                    },
                                    {
                                        key: 'delete',
                                        content: 'Удалить',
                                        icon: 'delete',
                                        onClick: () => onDelete(client)
                                    }
                                ]}
                                color="neutral"
                                size="sm"
                                variant="plain"
                            />
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
}