import React from 'react';
import { Link } from 'react-router-dom';

import { List } from 'shared/ui-components';

export default function MeetingsList({ meetings }) {
    return (
        <List>
            {meetings?.map(meeting =>
                <List.Item
                    key={meeting.id}
                    as={Link}
                    to={meeting.url}
                    content={{
                        primary: meeting.title,
                        secondary: meeting.datetime
                    }}
                    end={<>
                        <span>{meeting.registrations.filter(r => r.status === 'pending').length}</span>
                        /
                        <span style={{ color: 'green' }}>{meeting.registrations.filter(r => r.status === 'approved').length}</span>
                        /
                        <span style={{ color: 'red' }}>{meeting.registrations.filter(r => r.status === 'canceled').length}</span>
                    </>}
                />
            )}
        </List>
    );
}