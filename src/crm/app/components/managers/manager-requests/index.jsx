import PageSection from 'shared/components/page-section';

import RequestsList from 'crm/components/requests/requests-list';

export default function ManagerRequests({ requests }) {
    return (
        <PageSection
            className="agerRequests"
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