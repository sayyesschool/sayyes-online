import React from 'react';
import {
    Card,
    Icon,
    List,
    Typography
} from 'mdc-react';

export default function PaymentsCard({ payments }) {
    return (
        <Card outlined>
            <Card.Header
                title="Платежи"
            />

            {payments.length > 0 ?
                <Card.Section>
                    <List twoLine>
                        {payments.map(payment =>
                            <ListItem key={payment.id}>
                                <ListItemGraphic>
                                    <Icon>confirmation_number</Icon>
                                </ListItemGraphic>

                                <ListItemText
                                    primary={payment.title}
                                    secondary={payment.meeting ? payment.meeting.title : 'Не использован'}
                                />
                            </ListItem>
                        )}
                    </List>
                </Card.Section>
                :
                <Card.Section primary>
                    <Typography noMargin>Вы еще не совершили ни один платеж.</Typography>
                </Card.Section>
            }
        </Card>
    );
}