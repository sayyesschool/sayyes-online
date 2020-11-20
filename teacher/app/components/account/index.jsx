import React, { useState, useCallback } from 'react';
import {
    Button,
    Card,
    Typography
} from 'mdc-react';

import { useStore } from 'shared/hooks/store';
import { actions as userActions } from 'shared/store/modules/user';
import Page from 'shared/components/page';
import PageContent from 'shared/components/page-content';

import ProfileForm from 'app/components/account/profile-form';

import './index.scss';

export default function AccountPage() {
    const [user, actions] = useStore(state => state.user, userActions);

    const handleProfileFormSubmit = useCallback(data => {
        actions.updateProfile(data)
            .then(() => setProfileDialogOpen(false));
    }, []);

    return (
        <Page id="account-page">
            <PageContent>
                <Typography element="h1" type="headline4">Мой аккаунт</Typography>

                <Card>
                    <Card.Header
                        title="Профиль"
                    />

                    <Card.Section primary>
                        <ProfileForm
                            user={user}
                            onSubmit={handleProfileFormSubmit}
                        />
                    </Card.Section>

                    <Card.Actions>
                        <Card.Action>
                            <Button>Сохранить</Button>
                        </Card.Action>
                    </Card.Actions>
                </Card>
            </PageContent>
        </Page>
    );
}