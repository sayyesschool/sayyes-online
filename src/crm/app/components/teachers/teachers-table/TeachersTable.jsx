import { Link as RouterLink } from 'react-router-dom';

import { timezonesMap } from 'shared/data/timezones';
import { UserDomainLabel } from 'shared/data/user';
import { Chip, IconButton, Link, Menu, Table } from 'shared/ui-components';

const columns = [
    { key: 'fullname', content: 'Имя и фамилия' },
    { key: 'email', content: 'Email' },
    { key: 'phone', content: 'Телефон' },
    { key: 'dob', text: 'День рождения' },
    { key: 'timezone', content: 'Часовой пояс' },
    { key: 'domains', content: 'Доступ' },
    { key: 'actions' }
];

export default function TeachersTable({ teachers, onEdit, onDelete }) {
    return (
        <Table className="TeachersTable">
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
                {teachers.map(teacher =>
                    <Table.Row key={teacher.id}>
                        <Table.Cell>
                            <Link as={RouterLink} to={`/teachers/${teacher.id}`}>{teacher.fullname}</Link>
                        </Table.Cell>

                        <Table.Cell
                            content={teacher.email}
                        />

                        <Table.Cell
                            content={teacher.phone}
                        />

                        <Table.Cell
                            content={teacher.birthdate &&
                                `${teacher.birthdate} (${teacher.age})`
                            }
                        />

                        <Table.Cell
                            content={timezonesMap.get(teacher.timezone) || ''}
                        />

                        <Table.Cell>
                            <Chip.Group
                                chips={teacher.domains.map(domain => ({
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
                                        color="neutral"
                                        size="sm"
                                        variant="plain"
                                    />
                                }
                                items={[
                                    {
                                        key: 'edit',
                                        icon: 'edit',
                                        content: 'Изменить',
                                        onClick: () => onEdit(teacher)
                                    }, {
                                        key: 'delete',
                                        icon: 'delete',
                                        content: 'Удалить',
                                        color: 'danger',
                                        onClick: () => onDelete(teacher)
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