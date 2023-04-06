import PageSection from 'shared/components/page-section';

import RequestsList from 'app/components/requests/requests-list';

export default function ManagerRequests({ requests }) {
    return (
        <PageSection
            className="sy-ManagerRequests"
            title="Заявки"
            compact
        >
            {requests?.length > 0 &&
                <RequestsList
                    requests={requests}
                />
            }
        </PageSection>
    );
}