import { Link as RouterLink } from 'react-router-dom';

import { IconButton, Link, MenuButton, Table } from 'shared/ui-components';
import { timezonesMap } from 'shared/data/timezones';

const columns = [
    { key: 'fullname', text: 'Имя и фамилия' },
    { key: 'email', text: 'Email' },
    { key: 'phone', text: 'Телефон' },
    { key: 'dob', text: 'День рождения' },
    { key: 'timezone', text: 'Часовой пояс' },
    { key: 'actions' }
];

export default function ManagersTable({ managers, onEdit, onDelete }) {
    return (
        <Table className="managers-table">
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
                {managers.map(manager =>
                    <Table.Row key={manager.id}>
                        <Table.Cell>
                            <Link as={RouterLink} to={`/managers/${manager.id}`}>{manager.fullname}</Link>
                        </Table.Cell>

                        <Table.Cell content={manager.email} />

                        <Table.Cell content={manager.phone} />

                        <Table.Cell
                            content={manager.birthdate &&
                                `${manager.birthdate} (${manager.age})`
                            }
                        />

                        <Table.Cell content={timezonesMap.get(manager.timezone) || ''} />

                        <Table.Cell align="end">
                            <MenuButton
                                trigger={
                                    <IconButton
                                        icon="more_vert"
                                        size="sm"
                                        color="neutral"
                                        variant="plain"
                                    />
                                }
                                items={[
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
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
}