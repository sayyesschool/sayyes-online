import { useState } from 'react';

import Page from 'shared/components/page';
import { useStore } from 'shared/hooks/store';
import { actions as userActions } from 'shared/store/modules/user';

import Profile from 'lk/components/account/profile';

import './Account.scss';

export default function AccountPage() {
    const [user, actions] = useStore(state => state.user, userActions);
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <Page layout="narrower">
            <Page.Header title="Личный кабинет" />

            <Page.Content>
                {activeTab === 'profile' &&
                    <Profile
                        user={user}
                    />
                }
            </Page.Content>
        </Page>
    );
}