import React from 'react';
import { Link } from 'react-router-dom';
import {
    Chip,
    DataTable,
    Switch
} from 'mdc-react';

export default function MeetingsTable({ meetings }) {
    return (
        <DataTable className="meetings-table">
            <DataTable.Header>
                <DataTable.HeaderRow>
                    <DataTable.HeaderCell>Тема</DataTable.HeaderCell>
                    <DataTable.HeaderCell>Дата и время</DataTable.HeaderCell>
                    <DataTable.HeaderCell>Ведущий</DataTable.HeaderCell>
                    <DataTable.HeaderCell>Уровень</DataTable.HeaderCell>
                    <DataTable.HeaderCell>Идентификатор Zoom</DataTable.HeaderCell>
                    <DataTable.HeaderCell>Кол-во регистраций</DataTable.HeaderCell>
                    <DataTable.HeaderCell>Кол-во участников</DataTable.HeaderCell>
                    <DataTable.HeaderCell>Опубликовано</DataTable.HeaderCell>
                </DataTable.HeaderRow>
            </DataTable.Header>

            <DataTable.Content>
                {meetings.map(meeting =>
                    <DataTable.Row key={meeting.id}>
                        <DataTable.Cell>
                            <Link to={`/meetings/${meeting.id}`}>
                                {meeting.title}
                            </Link>
                        </DataTable.Cell>

                        <DataTable.Cell>{meeting.datetime}</DataTable.Cell>

                        <DataTable.Cell>
                            {meeting.host ?
                                <Chip
                                    component={Link}
                                    to={`/users/${meeting.host.id}`}
                                    text={meeting.host.fullname}
                                />
                                :
                                '[Ведущий не назначен]'
                            }
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {meeting.level || '[Уровень не назначен]'}
                        </DataTable.Cell>

                        <DataTable.Cell>{meeting.zoomId}</DataTable.Cell>

                        <DataTable.Cell numeric>
                            {meeting.registrations.length}
                        </DataTable.Cell>

                        <DataTable.Cell numeric>
                            {`${meeting.participants.length}${meeting.capacity ? '/' + meeting.capacity : ''}`}
                        </DataTable.Cell>

                        <DataTable.Cell numeric>
                            <Switch
                                name="published"
                                checked={meeting.published}
                            />
                        </DataTable.Cell>
                    </DataTable.Row>
                )}
            </DataTable.Content>
        </DataTable>
    );
}