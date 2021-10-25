import {
    Card,
    Icon
} from 'mdc-react';

import RequestsList from 'app/components/requests/requests-list';

export default function ClientRequests({ requests }) {
    return (
        <section className="client-requests">
            <Card>
                <Card.Header
                    graphic={<Icon>contact_phone</Icon>}
                    title="Заявки"
                />

                {requests?.length > 0 &&
                    <RequestsList
                        requests={requests}
                    />
                }
            </Card>
        </section>
    );
}