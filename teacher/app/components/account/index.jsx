import { useCallback } from 'react';
import { Button } from '@fluentui/react-northstar';

import { useUser } from 'shared/hooks/user';
import Icon from 'shared/components/icon';
import Page from 'shared/components/page';
import PageContent from 'shared/components/page-content';
import PageHeader from 'shared/components/page-header';
import PageSection from 'shared/components/page-section';

import ProfileForm from 'app/components/account/profile-form';

import './index.scss';

export default function AccountPage() {
    const [user, actions] = useUser();

    const handleProfileFormSubmit = useCallback(data => {
        actions.updateProfile(data);
    }, []);

    return (
        <Page id="account-page">
            <PageHeader
                title="Мой аккаунт"
            />

            <PageContent>
                <PageSection
                    title="Профиль"
                    actions={
                        <Button
                            icon={<Icon>save</Icon>}
                            iconOnly
                            text
                            title="Сохранить"
                        />
                    }
                >
                    <ProfileForm
                        user={user}
                        onSubmit={handleProfileFormSubmit}
                    />
                </PageSection>
            </PageContent>
        </Page>
    );
}