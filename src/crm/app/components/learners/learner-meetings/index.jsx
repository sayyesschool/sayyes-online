import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    Icon,
    List, ListItem
} from 'mdc-react';

export default function UserDetails({ user }) {
    return (
        <Card outlined>
            <Card.Header
                graphic={<Icon>people</Icon>}
                title="Встречи"
                subtitle={!user.meetings?.length && 'Пользователь еще не участвовал ни в одной встрече.'}
            />

            <Card.Section>
                {user.meetings?.length > 0 &&
                    <List twoLine>
                        {user.meetings.map(meeting =>
                            <ListItem
                                key={meeting.id}
                                component={Link}
                                to={meeting.url}
                                primaryText={meeting.title}
                                secondaryText={meeting.datetime}
                            />
                        )}
                    </List>
                }
            </Card.Section>
        </Card>
    );
}