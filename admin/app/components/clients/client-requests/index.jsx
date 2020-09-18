import React from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Card,
    Icon,
    List,
    Typography
} from 'mdc-react';

export default function ClientRequests({ requests }) {
    return (
        <section className="client-requests">
            <Card>
                <Card.Header
                    title="Заявки"
                />

                {requests && requests.length > 0 ?
                    <List twoLine>
                        {requests.map(request =>
                            <List.Item
                                key={request.id}
                                component={Link}
                                to={request.url}
                                graphic={<Icon>{request.statusIcon}</Icon>}
                                primaryText={`Заявка`}
                                secondaryText={request.statusLabel}
                                meta={request.manager && <Avatar text={request.manager.initials} title={request.manager.fullname} />}
                            />
                        )}
                    </List>
                    :
                    <Card.Section primary>
                        <Typography noMargin>Заявок нет</Typography>
                    </Card.Section>
                }
            </Card>
        </section>
    );
}