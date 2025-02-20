import { Link as RouterLink } from 'react-router-dom';

import { timezonesMap } from 'shared/data/timezones';
import { UserDomainLabel } from 'shared/data/user';
import { Chip, IconButton, Link, Menu, Table } from 'shared/ui-components';

const columns = [
    { key: 'fullname', content: 'Имя и фамилия' },
    { key: 'email', content: 'Email' },
    { key: 'phone', content: 'Телефон' },
    { key: 'dob', content: 'День рождения' },
    { key: 'timezone', content: 'Часовой пояс' },
    { key: 'domains', content: 'Доступ' },
    { key: 'actions' }
];

export default function ManagersTable({ managers, onEdit, onDelete }) {
    return (
        <Table className="ManagersTable">
            <Table.Head>
                <Table.Row header>
                    {columns.map(col =>
                        <Table.Cell
                            key={col.key}
                            content={col.content}
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

                        <Table.Cell
                            content={manager.email}
                        />

                        <Table.Cell
                            content={manager.phone}
                        />

                        <Table.Cell
                            content={manager.birthdate &&
                                `${manager.birthdate} (${manager.age})`
                            }
                        />

                        <Table.Cell
                            content={timezonesMap.get(manager.timezone) || ''}
                        />

                        <Table.Cell>
                            <Chip.Group
                                chips={manager.domains.map(domain => ({
                                    key: domain,
                                    content: UserDomainLabel[domain]
                                }))}
                                size="sm"
                            />
                        </Table.Cell>

                        <Table.Cell align="end">
                            <Menu
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
                                        icon: 'edit',
                                        content: 'Изменить',
                                        onClick: () => onEdit(manager)
                                    },
                                    {
                                        key: 'delete',
                                        icon: 'delete',
                                        content: 'Удалить',
                                        color: 'danger',
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