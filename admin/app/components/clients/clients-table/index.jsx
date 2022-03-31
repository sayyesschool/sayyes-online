import { Link } from 'react-router-dom';
import {
    MenuButton,
    Table
} from '@fluentui/react-northstar';

export default function ClientsTable({ clients, onEdit, onDelete }) {
    return (
        <Table className="clients-table">
            <Table.Row header>
                {columns.map(col =>
                    <Table.Cell
                        key={col.key}
                        content={col.text}
                    />
                )}

                <Table.Cell />
            </Table.Row>

            {clients.map(client =>
                <Table.Row key={client.id}>
                    <Table.Cell
                        content={
                            <Link to={`/clients/${client.id}`}>{client.fullname}</Link>
                        }
                    />
                    <Table.Cell content={client.email} />
                    <Table.Cell content={client.phone} />
                    <Table.Cell
                        content={
                            <MenuButton
                                menu={[
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
                            />
                        }
                    />
                </Table.Row>
            )}
        </Table >
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