import React from 'react';
import { Link } from 'react-router-dom';
import {
    DataTable
} from 'mdc-react';

export default function TicketList({ tickets }) {
    return (
        <DataTable id="ticket-list">
            <DataTable.Header>
                <DataTable.HeaderRow>
                    <DataTable.Cell>Билет</DataTable.Cell>
                    <DataTable.Cell>Пользователь</DataTable.Cell>
                    <DataTable.Cell>Встреча</DataTable.Cell>
                    <DataTable.Cell>Цена, руб.</DataTable.Cell>
                    <DataTable.Cell>Дата оплаты</DataTable.Cell>
                    <DataTable.Cell>Дата окончания</DataTable.Cell>
                </DataTable.HeaderRow>
            </DataTable.Header>

            <DataTable.Content>
                {tickets.map(ticket =>
                    <DataTable.Row key={ticket.id}>
                        <DataTable.Cell>{ticket.title}</DataTable.Cell>

                        <DataTable.Cell>
                            <Link to={`/users/${ticket.user.id}`}>{ticket.user.fullname}</Link>
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {ticket.meeting ?
                                <Link to={`/meetings/${ticket.meeting.id}`}>
                                    {ticket.meeting.title}
                                </Link>
                                :
                                '[Встреча не указана]'
                            }
                        </DataTable.Cell>

                        <DataTable.Cell>{ticket.price}</DataTable.Cell>

                        <DataTable.Cell>{ticket.paidAt}</DataTable.Cell>

                        <DataTable.Cell>{ticket.expiresAt}</DataTable.Cell>
                    </DataTable.Row>
                )}
            </DataTable.Content>
        </DataTable>
    );
}