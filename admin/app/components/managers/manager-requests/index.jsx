import PageSection from 'shared/components/page-section';

import RequestsList from 'app/components/requests/requests-list';

export default function ManagerRequests({ requests }) {
    return (
        <PageSection
            className="manager-requests"
            title="Заявки"
        >
            {requests?.length > 0 &&
                <RequestsList
                    requests={requests}
                />
            }
        </PageSection>
    );
}