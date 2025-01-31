import { Link as RouterLink } from 'react-router-dom';

import { IconButton, Link, Table } from 'shared/ui-components';

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
        key: 'actions'
    }
];

export default function LearnersTable({ learners, onEdit, onDelete }) {
    return (
        <Table className="LearnersTable">
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
                {learners.map(learner =>
                    <Table.Row key={learner.id}>
                        <Table.Cell>
                            <Link component={RouterLink} to={`/learners/${learner.id}`}>{learner.fullname}</Link>
                        </Table.Cell>

                        <Table.Cell content={learner.email} />

                        <Table.Cell content={learner.phone} />

                        <Table.Cell align="end">
                            <IconButton.Group
                                buttons={[
                                    {
                                        key: 'edit',
                                        content: 'Изменить',
                                        icon: 'edit',
                                        onClick: () => onEdit(learner)
                                    },
                                    {
                                        key: 'delete',
                                        content: 'Удалить',
                                        icon: 'delete',
                                        onClick: () => onDelete(learner)
                                    }
                                ]}
                                color="neutral"
                                size="sm"
                                variant="plain"
                            />
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
}