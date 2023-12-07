import { useMemo } from 'react';

import Chat from 'shared/components/chat';
import PageSection from 'shared/components/page-section';
import { IconButton } from 'shared/ui-components';

export default function EnrollmentChat({
    enrollment,
    user,
    onConnected,
    onJoined,
    onClose
}) {
    const participantsById = useMemo(() => {
        const { learner, teacher } = enrollment;

        return {
            [learner.id]: learner.fullname,
            [teacher.id]: teacher.fullname
        };
    }, [enrollment]);

    return (
        <PageSection
            className="EnrollmentChat"
            title="Чат"
            actions={
                <IconButton
                    icon="close"
                    title="Закрыть"
                    size="sm"
                    onClick={onClose}
                />
            }
        >
            <Chat
                conversationId={enrollment.id}
                userId={user.id}
                participantsById={participantsById}
                onJoined={onJoined}
                onConnected={onConnected}
            />
        </PageSection>
    );
}