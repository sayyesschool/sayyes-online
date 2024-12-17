import { Link } from 'react-router-dom';

import PersonChip from 'shared/components/person-chip';
import { Table } from 'shared/ui-components';

const columns = [
    { key: 'user', text: 'Пользователь' },
    { key: 'price', text: 'Стоимость, руб.' },
    { key: 'purchasedAt', text: 'Дата покупки' },
    { key: 'expiresAt', text: 'Дата окончания' },
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
                {memberships.map(membership =>
                    <Table.Row key={membership.id}>
                        <Table.Cell>
                            {membership.user &&
                                <PersonChip
                                    as={Link}
                                    to={`/learners/${membership.user.id}`}
                                    imageSrc={membership.user.imageUrl}
                                    content={membership.user.fullname}
                                />
                            }
                        </Table.Cell>

                        <Table.Cell content={membership.price} />
                        <Table.Cell content={membership.purchasedAt} />
                        <Table.Cell content={membership.expiresAt} />
                        <Table.Cell content={`${membership.registrationsCount} / ${membership.limit}`} />
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
}