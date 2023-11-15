import React from 'react';
import { Link } from 'react-router-dom';
import {
    List, ListItem
} from 'mdc-react';

export default function MeetingsList({ meetings }) {
    return (
        <List twoLine>
            {meetings?.map(meeting =>
                <ListItem
                    key={meeting.id}
                    element={Link}
                    to={meeting.url}
                >
                    <ListItem.Text
                        primary={meeting.title}
                        secondary={meeting.datetime}
                    />

                    <ListItem.Meta
                        title="Кол-во регистраций"
                    >
                        <span>{meeting.registrations.filter(r => r.status === 'pending').length}</span>
                        /
                        <span style={{ color: 'green' }}>{meeting.registrations.filter(r => r.status === 'approved').length}</span>
                        /
                        <span style={{ color: 'red' }}>{meeting.registrations.filter(r => r.status === 'canceled').length}</span>
                    </ListItem.Meta>
                </ListItem>
            )}
        </List>
    );
}