import React from 'react';
import { Link } from 'react-router-dom';

import { List, Text } from 'shared/ui-components';

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
                    end={
                        <Text>
                            <Text
                                content={meeting.registrations?.filter(r => r.status === 'pending').length ?? 0}
                                variant="soft"
                                title="Ожидают подтверждения"
                            />

                            <Text
                                content={meeting.registrations?.filter(r => r.status === 'approved').length ?? 0}
                                color="success"
                                variant="soft"
                                title="Подтверждено"
                            />

                            <Text
                                content={meeting.registrations?.filter(r => r.status === 'canceled').length ?? 0}
                                color="danger"
                                variant="soft"
                                title="Отменено"
                            />
                        </Text>
                    }
                />
            )}
        </List>
    );
}