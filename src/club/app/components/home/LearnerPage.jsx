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
                description="Разговорный клуб в SAY YES! - это идеальное место, где английский становится твоим лучшим другом! Представьте себе уютную атмосферу, наполненную живым общением, искренними улыбками и свободным владением языком. Здесь вы сможете преодолеть языковой барьер раз и навсегда!"
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