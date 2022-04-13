import PageSection from 'shared/components/page-section';

import RequestsList from 'app/components/requests/requests-list';

export default function ClientRequests({ requests }) {
    return (
        <PageSection className="client-requests" title="Заявки">
            {requests?.length > 0 &&
                <RequestsList
                    requests={requests}
                />
            }
        </PageSection>
    );
}