import React from 'react';
import {
    Card,
    Typography
} from 'mdc-react';

import RequestsList from 'app/components/requests/requests-list';

export default function ManagerRequests({ requests }) {
    return (
        <section className="manager-requests">
            <Card>
                <Card.Header
                    title="Заявки"
                />

                {requests && requests.length > 0 ?
                    <RequestsList
                        requests={requests}
                    />
                    :
                    <Card.Section primary>
                        <Typography noMargin>Заявок нет</Typography>
                    </Card.Section>
                }
            </Card>
        </section>
    );
}