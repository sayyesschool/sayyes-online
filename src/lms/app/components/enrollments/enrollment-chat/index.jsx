import { useMemo } from 'react';

import Chat from 'shared/components/Chat';
import PageSection from 'shared/components/page-section';

export default function EnrollmentChat({ enrollment, user }) {
    const participantsById = useMemo(() => {
        const { client, teachers: [teacher] } = enrollment;

        return {
            [client.id]: client.fullname,
            [teacher.id]: teacher.fullname
        };
    });

    return (
        <PageSection className="EnrollmentChat" title="Чат">
            <Chat
                conversationId={enrollment.id}
                userId={user.id}
                participantsById={participantsById}
            //onConnected={handleChatConnected}
            />
        </PageSection>
    );
}