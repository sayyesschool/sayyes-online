import { useCallback } from 'react';

import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useAccount } from 'shared/hooks/account';
import { useUser } from 'shared/hooks/user';
import { actions as userActions } from 'shared/store/modules/user';

import Profile from 'lk/components/profile';

import styles from './Account.module.scss';

export default function AccountPage() {
    const [user] = useUser(state => state.user, userActions);
    const [,actions] = useAccount(state => state.user, userActions);

    const handleAvatarChange = useCallback(data => {
        return actions.updateAvatar(data);
    }, [actions]);

    const handleProfileChange = useCallback(data => {
        return actions.updateProfile(data);
    }, [actions]);

    if (!user) return <LoadingIndicator />;

    return (
        <Page>
            <Page.Header title="Личный кабинет" />

            <Page.Content className={styles.content}>
                <Page.Section
                    title="Мои данные"
                    variant="plain"
                    compact
                    plain
                >
                    <Profile
                        user={user}
                        onAvatarChange={handleAvatarChange}
                        onProfileChange={handleProfileChange}
                    />
                </Page.Section>
            </Page.Content>
        </Page>
    );
}