import { Button, Checkbox, Icon, Table } from 'shared/ui-components';

const columns = [
    { key: 'title', content: 'Название' },
    { key: 'login', content: 'Логин' },
    { key: 'password', content: 'Пароль' },
    { key: 'active', content: 'Работает' }
];

export default function RoomsTable({ rooms, onEdit, onToggleActive, onDelete }) {
    return (
        <Table className="rooms-table">
            <Table.Row header>
                {columns.map(col =>
                    <Table.Cell
                        key={col.key}
                        content={col.content}
                    />
                )}

                <Table.Cell />
            </Table.Row>

            {rooms.map(room =>
                <Table.Row key={room.id}>
                    <Table.Cell content={room.title} />

                    <Table.Cell content={room.login} />

                    <Table.Cell content={room.password} />

                    <Table.Cell
                        content={
                            <Checkbox
                                checked={room.active}
                                toggle
                                onChange={() => onToggleActive(room)}
                            />
                        }
                    />

                    <Table.Cell
                        className="ui-table__cell--actions"
                        content={
                            <Button.Group
                                buttons={[
                                    {
                                        key: 'edit',
                                        icon: <Icon>edit</Icon>,
                                        iconOnly: true,
                                        flat: true,
                                        text: true,
                                        title: 'Изменить',
                                        onClick: () => onEdit(room)
                                    },
                                    {
                                        key: 'delete',
                                        icon: <Icon>delete</Icon>,
                                        iconOnly: true,
                                        flat: true,
                                        text: true,
                                        title: 'Удалить',
                                        onClick: () => onDelete(room)
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