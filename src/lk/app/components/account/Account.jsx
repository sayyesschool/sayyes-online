import { useCallback } from 'react';

import Page from 'shared/components/page';
import { useStore } from 'shared/hooks/store';
import { actions as userActions } from 'shared/store/modules/user';

import Profile from 'lk/components/profile';

import styles from './Account.module.scss';

export default function AccountPage() {
    const [user, actions] = useStore(state => state.user, userActions);

    const updateProfile = useCallback(data => {
        return actions.updateProfile(user.id, data);
    }, [actions, user.id]);

    return (
        <Page>
            <Page.Header title="Личный кабинет" />

            <Page.Content className={styles.content}>
                <Profile user={user} updateProfile={updateProfile} />
            </Page.Content>
        </Page>
    );
}