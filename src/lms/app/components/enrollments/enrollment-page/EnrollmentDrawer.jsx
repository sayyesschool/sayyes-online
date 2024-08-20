import { useCallback, useMemo } from 'react';

import Chat from 'shared/components/chat';
import Page from 'shared/components/page';

import VocabularyLexemes from 'lms/components/vocabulary/vocabulary-lexemes';

export const DRAWER_CONTENT = { chat: 'chat', vocabulary: 'vocabulary' };

const DRAWER_TITLES = {
    [DRAWER_CONTENT.chat]: 'Чат',
    [DRAWER_CONTENT.vocabulary]: 'Словарь'
};

export default function EnrollmentDrawer({
    vocabulary,
    enrollment,
    drawerContent,
    user,
    learnerId,
    hasChat,
    hasVocabulary,
    setDrawerContent,
    setUnreadMessagesCount
}) {
    const drawerTitle = DRAWER_TITLES[drawerContent] || '';

    const participantsById = useMemo(() => {
        if (!enrollment) return;

        const { learner, teacher } = enrollment;

        return {
            [learner.id]: learner.fullname,
            [teacher.id]: teacher.fullname
        };
    }, [enrollment]);

    const handleChatJoined = useCallback(data => {
        setUnreadMessagesCount(data.unreadMessagesCount);
    }, [setUnreadMessagesCount]);

    const closeDrawer = useCallback(() => {
        setDrawerContent(null);
    }, [setDrawerContent]);

    // TODO: Возможно, лучше сделать функцию renderContent для и сделать там обычные условия, а не тернарник, для лучшей читаемости
    return (
        <Page.Drawer open={!!drawerContent}>
            <Page.DrawerContent title={drawerTitle} onClose={closeDrawer}>
                {drawerContent === DRAWER_CONTENT.chat && hasChat ? (
                    <Chat
                        conversationId={enrollment.id}
                        userId={user.id}
                        participantsById={participantsById}
                        onJoined={handleChatJoined}
                    />
                ) : drawerContent === DRAWER_CONTENT.vocabulary && hasVocabulary ? (
                    <VocabularyLexemes
                        vocabulary={vocabulary}
                        user={user}
                        learnerId={learnerId}
                        isDrawer={true}
                    />
                ) : null}
            </Page.DrawerContent>
        </Page.Drawer>
    );
}