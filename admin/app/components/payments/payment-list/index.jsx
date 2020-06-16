import React from 'react';
import { Link } from 'react-router-dom';
import {
    DataTable, DataTableHeader, DataTableContent, DataTableRow, DataTableCell
} from 'mdc-react';

export default function MeetingList({ tickets }) {
    return (
        <DataTable id="meeting-list">
            <DataTableHeader>
                <DataTableRow header>
                    <DataTableCell header>Билет</DataTableCell>
                    <DataTableCell header>Пользователь</DataTableCell>
                    <DataTableCell header>Встреча</DataTableCell>
                    <DataTableCell header>Цена, руб.</DataTableCell>
                    <DataTableCell header>Дата оплаты</DataTableCell>
                    <DataTableCell header>Дата окончания</DataTableCell>
                </DataTableRow>
            </DataTableHeader>

            <DataTableContent>
                {tickets.map(ticket =>
                    <DataTableRow key={ticket.id}>
                        <DataTableCell>{ticket.title}</DataTableCell>

                        <DataTableCell>
                            {ticket.user.fullname}
                        </DataTableCell>

                        <DataTableCell>
                            {ticket.meeting ?
                                <Link to={`/meetings/${ticket.meeting.id}`}>
                                    {ticket.meeting.title}
                                </Link>
                                :
                                '[Встеча не указана]'
                            }
                        </DataTableCell>

                        <DataTableCell>{ticket.price}</DataTableCell>

                        <DataTableCell>{ticket.paidAt}</DataTableCell>

                        <DataTableCell>{ticket.expiresAt}</DataTableCell>
                    </DataTableRow>
                )}
            </DataTableContent>
        </DataTable>
    );
}