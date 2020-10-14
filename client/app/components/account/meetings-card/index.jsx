import React from 'react';
import {
    Card,
    Icon,
    List,
    Typography
} from 'mdc-react';

export default function MeetingsCard({ meetings }) {
    return (
        <Card outlined>
            <Card.Header title="Встречи" />

            {meetings.length > 0 ?
                <Card.Section>
                    <List twoLine nonInteractive>
                        {meetings.map(meeting =>
                            <ListItem key={meeting.id}>
                                <ListItemGraphic>
                                    <Icon>people</Icon>
                                </ListItemGraphic>

                                <ListItemText
                                    primary={meeting.title}
                                    secondary={meeting.datetime}
                                />
                            </ListItem>
                        )}
                    </List>
                </Card.Section>
                :
                <Card.Section primary>
                    <Typography>Вы еще не участвовали ни в одной встрече.</Typography>
                </Card.Section>
            }
        </Card>
    );
}