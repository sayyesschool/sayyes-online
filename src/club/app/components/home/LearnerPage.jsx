import Page from 'shared/components/page';
import { Flex } from 'shared/components/ui';

import MeetingsSection from 'club/components/meetings/meetings-section';
import MembershipsSection from 'club/components/memberships/memberships-section';

export default function LearnerPage() {
    return (
        <Page
            className="HomePage LearnerPage"
            title="Разговорный клуб"
        >
            <Page.Header
                title="Разговорный клуб"
            />

            <Page.Content>
                <Flex dir="column" gap="lg">
                    <MembershipsSection />
                    <MeetingsSection />
                </Flex>
            </Page.Content>
        </Page>
    );
}