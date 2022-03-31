import {
    Header,
    Segment
} from '@fluentui/react-northstar';

import RequestsList from 'app/components/requests/requests-list';

export default function ClientRequests({ requests }) {
    return (
        <Segment as="section" className="client-requests">
            <Header
                as="h3"
                content="Заявки"
            />

            {requests?.length > 0 &&
                <RequestsList
                    requests={requests}
                />
            }
        </Segment>
    );
}