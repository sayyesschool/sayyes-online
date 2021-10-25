import {
    Card,
    Icon,
    List,
    Typography
} from 'mdc-react';

export default function TicketsCard({ tickets }) {
    return (
        <Card outlined>
            <Card.Header title="Билеты" />

            {tickets.length > 0 ?
                <Card.Section>
                    <List>
                        {tickets.map(ticket =>
                            <ListItem key={ticket.id}>
                                <ListItemGraphic>
                                    <Icon>confirmation_number</Icon>
                                </ListItemGraphic>

                                <ListItemText
                                    primary={ticket.title}
                                    secondary={ticket.meeting ? ticket.meeting.title : 'Не использован'}
                                />
                            </ListItem>
                        )}
                    </List>
                </Card.Section>
                :
                <Card.Section primary>
                    <Typography>Вы еще не приобрели ни один билет.</Typography>
                </Card.Section>
            }
        </Card>
    );
}