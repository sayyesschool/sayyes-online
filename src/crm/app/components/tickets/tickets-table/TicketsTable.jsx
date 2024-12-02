import { Link } from 'react-router-dom';

import PersonChip from 'shared/components/person-chip';
import { Table } from 'shared/ui-components';

const columns = [
    { key: 'user', text: 'Пользователь' },
    { key: 'price', text: 'Стоимость, руб.' },
    { key: 'purchasedAt', text: 'Дата покупки' },
    { key: 'expiresAt', text: 'Дата окончания' },
    { key: 'meetings', text: 'Встречи' },
    { key: 'actions' }
];

export default function TicketsTable({ tickets, onEdit, onDelete }) {
    return (
        <Table className="TicketTable">
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
                {tickets.map(ticket =>
                    <Table.Row key={ticket.id}>
                        <Table.Cell>
                            {ticket.user &&
                                <PersonChip
                                    as={Link}
                                    to={`/learners/${ticket.user.id}`}
                                    imageSrc={ticket.user.imageUrl}
                                    content={ticket.user.fullname}
                                />
                            }
                        </Table.Cell>

                        <Table.Cell content={ticket.price} />
                        <Table.Cell content={ticket.purchasedAt} />
                        <Table.Cell content={ticket.expiresAt} />
                        <Table.Cell content={`${ticket.meetingIds.length} / ${ticket.limit}`} />
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
}