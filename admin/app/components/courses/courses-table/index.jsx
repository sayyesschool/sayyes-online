import { Link } from 'react-router-dom';
import {
    MenuButton,
    Table
} from '@fluentui/react-northstar';

export default function CoursesTable({ courses, onEdit, onDelete }) {
    return (
        <Table className="courses-table">
            <Table.Row header>
                {columns.map(col =>
                    <Table.Cell
                        key={col.key}
                        content={col.text}
                    />
                )}
            </Table.Row>

            {courses.map(course =>
                <Table.Row key={course.id}>
                    <Table.Cell
                        content={<Link to={course.uri}>{course.title}</Link>}
                    />

                    <Table.Cell
                        content={
                            <MenuButton
                                items={[
                                    {
                                        key: 'edit',
                                        icon: 'edit',
                                        content: 'Изменить',
                                        onClick: () => onEdit(course)
                                    },
                                    {
                                        key: 'delete',
                                        icon: 'delete',
                                        content: 'Удалить',
                                        onClick: () => onDelete(course)
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
        key: 'title',
        text: 'Название'
    },
    {
        key: 'actions'
    }
];