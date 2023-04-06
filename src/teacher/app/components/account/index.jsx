import { useCallback } from 'react';

import { useUser } from 'shared/hooks/user';
import Page from 'shared/components/page';
import { Button } from 'shared/ui-components';

import ProfileForm from 'app/components/account/profile-form';

import './index.scss';

export default function AccountPage() {
    const [user, actions] = useUser();

    const handleProfileFormSubmit = useCallback(data => {
        actions.updateProfile(data);
    }, []);

    return (
        <Page id="account-page">
            <Page.Header
                title="Мой аккаунт"
            />

            <Page.Content>
                <Page.Section
                    title="Профиль"
                    actions={
                        <Button
                            icon="save"
                            text
                            title="Сохранить"
                        />
                    }
                >
                    <ProfileForm
                        user={user}
                        onSubmit={handleProfileFormSubmit}
                    />
                </Page.Section>
            </Page.Content>
        </Page>
    );
}