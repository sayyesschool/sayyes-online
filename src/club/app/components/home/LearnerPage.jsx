import { useCallback } from 'react';

import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { Alert, Flex, Text } from 'shared/components/ui';
import { useMeetings } from 'shared/hooks/meetings';
import { useMembershipOptions, useMemberships } from 'shared/hooks/memberships';

import MeetingsSection from 'club/components/meetings/meetings-section';
import MembershipsSection from 'club/components/memberships/memberships-section';

export default function LearnerPage() {
    const [meetings, actions] = useMeetings();
    const [memberships] = useMemberships();
    const options = useMembershipOptions();

    const handleRegister = useCallback(meeting => {
        if (meeting.isRegistered || meeting.isPending) {
            return actions.unregisterFromMeeting(meeting.id);
        } else {
            return actions.registerForMeeting(meeting.id);
        }
    }, [actions]);

    if (!meetings) return <LoadingIndicator fullscreen />;

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
                    <Alert color="warning" variant="soft">
                        {/** TODO: Make this message configurable in the admin panel */}
                        <Flex dir="column" gap="sm">
                            <Text>В августе Разговорный клуб уходит на паузу. В сентябре мы вернемся к вам с новым осенним расписанием.</Text>
                            <Text>С уважением,<br /> команда школы SAY YES!</Text>
                        </Flex>
                    </Alert>

                    <MembershipsSection
                        memberships={memberships}
                        options={options}
                    />

                    <MeetingsSection
                        meetings={meetings}
                        onRegister={handleRegister}
                    />
                </Flex>
            </Page.Content>
        </Page>
    );
}