import { IconButton, Switch, Table } from 'shared/ui-components';

const columns = [
    { key: 'name', content: 'Название' },
    { key: 'login', content: 'Логин' },
    { key: 'password', content: 'Пароль' },
    { key: 'lessons', content: 'Кол-во уроков за 30 дней' },
    { key: 'active', content: 'Работает' },
    { key: 'actions' }
];

export default function RoomsTable({ rooms, onEdit, onToggleActive, onDelete }) {
    return (
        <Table className="rooms-table">
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
                {rooms.map(room =>
                    <Table.Row key={room.id}>
                        <Table.Cell content={room.name} />
                        <Table.Cell content={room.login} />
                        <Table.Cell content={room.password} />
                        <Table.Cell content={room.lessonCount} />

                        <Table.Cell>
                            <Switch
                                checked={room.active}
                                size="sm"
                                onChange={() => onToggleActive(room)}
                            />
                        </Table.Cell>

                        <Table.Cell align="end">
                            <IconButton.Group
                                buttons={[
                                    {
                                        key: 'edit',
                                        icon: 'edit',
                                        title: 'Изменить',
                                        onClick: () => onEdit(room)
                                    },
                                    {
                                        key: 'delete',
                                        icon: 'delete',
                                        title: 'Удалить',
                                        onClick: () => onDelete(room)
                                    }
                                ]}
                                size="sm"
                                variant="plain"
                                color="neutral"
                            />
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
}