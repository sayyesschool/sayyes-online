import { Link as RouterLink } from 'react-router-dom';

import { IconButton, Link, MenuButton, Table } from 'shared/ui-components';
import { timezonesMap as timezones } from 'shared/data/timezones';

const columns = [
    { key: 'fullname', content: 'Имя и фамилия' },
    { key: 'email', content: 'Email' },
    { key: 'phone', content: 'Телефон' },
    { key: 'timezone', content: 'Часовой пояс' },
    { key: 'actions' }
];

export default function TeachersTable({ teachers, onEdit, onDelete }) {
    return (
        <Table className="sy-TeachersTable">
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
                            content={timezones.get(teacher.timezone) || ''}
                        />

                        <Table.Cell align="end">
                            <MenuButton
                                trigger={
                                    <IconButton
                                        icon="more_vert"
                                        color="neutral"
                                        size="sm"
                                        variant="plain"
                                    />
                                }
                                items={[{
                                    key: 'edit',
                                    content: 'Изменить',
                                    onClick: () => onEdit(teacher)
                                }, {
                                    key: 'delete',
                                    content: 'Удалить',
                                    onClick: () => onDelete(teacher)
                                }]}
                            />
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
}