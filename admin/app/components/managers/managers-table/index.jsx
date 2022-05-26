import { Link } from 'react-router-dom';
import { MenuButton, Table } from '@fluentui/react-northstar';

export default function ManagersTable({ managers, onEdit, onDelete }) {
    return (
        <Table className="managers-table">
            <Table.Row header>
                {columns.map(col =>
                    <Table.Cell
                        key={col.key}
                        content={col.text}
                    />
                )}

                <Table.Cell />
            </Table.Row>

            {managers.map(manager =>
                <Table.Row key={manager.id}>
                    <Table.Cell
                        content={
                            <Link to={`/managers/${manager.id}`}>{manager.fullname}</Link>
                        }
                    />

                    <Table.Cell content={manager.email} />

                    <Table.Cell content={manager.phone} />

                    <Table.Cell
                        content={manager.birthdate &&
                            `${manager.birthdate} (${manager.age})`
                        }
                    />

                    <Table.Cell content={manager.timezone} />

                    <Table.Cell
                        content={
                            <MenuButton
                                menu={[
                                    {
                                        key: 'edit',
                                        content: 'Изменить',
                                        onClick: () => onEdit(manager)
                                    },
                                    {
                                        key: 'delete',
                                        content: 'Удалить',
                                        onClick: () => onDelete(manager)
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
    }
];