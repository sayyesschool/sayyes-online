import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
    MenuButton,
    Table
} from '@fluentui/react-northstar';

import DataContext from 'app/contexts/data';

export default function TeachersTable({ teachers, onEdit, onDelete }) {
    const data = useContext(DataContext);

    return (
        <Table className="teachers-table">
            <Table.Row header>
                {columns.map(col =>
                    <Table.Cell
                        key={col.key}
                        content={col.text}
                    />
                )}
            </Table.Row>

            {teachers.map(teacher =>
                <Table.Row key={teacher.id}>
                    <Table.Cell
                        content={<Link to={`/teachers/${teacher.id}`}>{teacher.fullname}</Link>}
                    />

                    <Table.Cell
                        content={teacher.email}
                    />

                    <Table.Cell
                        content={teacher.phone}
                    />

                    <Table.Cell
                        content={teacher.timezone ? data.timezones.get(teacher.timezone) : '[Не указан]'}
                    />

                    <Table.Cell
                        content={
                            <MenuButton
                                menu={[
                                    {
                                        key: 'edit',
                                        content: 'Изменить',
                                        onClick: () => onEdit(teacher)
                                    },
                                    {
                                        key: 'delete',
                                        content: 'Удалить',
                                        onClick: () => onDelete(teacher)
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
        key: 'timezone',
        text: 'Часовой пояс'
    },
    {
        key: 'null'
    }
];