import { Link } from 'react-router-dom';

import PersonChip from 'shared/components/person-chip';
import { Table } from 'shared/ui-components';

const columns = [
    { key: 'number', text: '№' },
    { key: 'user', text: 'Пользователь' },
    { key: 'price', text: 'Стоимость, руб.' },
    { key: 'startDate', text: 'Дата начала' },
    { key: 'endDate', text: 'Дата окончания' },
    { key: 'registrations', text: 'Регистрации' },
    { key: 'actions' }
];

export default function MembershipsTable({ memberships, onEdit, onDelete }) {
    return (
        <Table className="MembershipsTable">
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
                {memberships.map((membership, index) =>
                    <Table.Row key={membership.id}>
                        <Table.Cell content={index + 1} />

                        <Table.Cell>
                            {membership.user &&
                                <PersonChip
                                    as={Link}
                                    to={`/learners/${membership.user.id}`}
                                    imageSrc={membership.user.imageUrl}
                                    content={membership.user.fullname || membership.user.email}
                                />
                            }
                        </Table.Cell>

                        <Table.Cell content={membership.price} />
                        <Table.Cell content={membership.startDateString} />
                        <Table.Cell content={membership.endDateString} />
                        <Table.Cell content={`${membership.registrationsCount} / ${membership.limit}`} />
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
}