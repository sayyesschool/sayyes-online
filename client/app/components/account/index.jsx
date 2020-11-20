import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    Icon,
    TabBar, Tab,
    Typography
} from 'mdc-react';

import { useStore } from 'shared/hooks/store';
import Page from 'shared/components/page';
import PageContent from 'shared/components/page-content';

import { actions as userActions } from 'app/store/modules/user';
import ProfileCard from 'app/components/account/profile-card';
import PaymentsCard from 'app/components/account/payments-card';
import TicketsCard from 'app/components/account/tickets-card';
import MeetingsCard from 'app/components/account/meetings-card';
import ProfileDialogForm from 'app/components/account/profile-dialog-form';

import './index.scss';

export default function AccountPage() {
    const [user, actions] = useStore(state => state.user, userActions);
    const [activeTab, setActiveTab] = useState('profile');
    const payments = [];
    const tickets = [];
    const meetings = [];

    const [isProfileDialogOpen, setProfileDialogOpen] = useState(false);

    const handleProfileFormSubmit = useCallback(data => {
        actions.updateProfile(data)
            .then(() => setProfileDialogOpen(false));
    }, []);

    return (
        <Page id="account-page">
            <PageContent>
                <Typography element="h1" type="headline4">Мой аккаунт</Typography>

                <TabBar value={activeTab} onChange={setActiveTab}>
                    <Tab value="profile" icon={<Icon>person</Icon>} label="Профиль" />
                    <Tab value="payments" icon={<Icon>payment</Icon>} label="Платежи" />
                    <Tab value="lessons" icon={<Icon>school</Icon>} label="Уроки" />
                    <Tab value="tickets" icon={<Icon>local_activity</Icon>} label="Билеты" />
                    <Tab value="meetings" icon={<Icon>event</Icon>} label="Встречи" />
                </TabBar>

                {activeTab === 'profile' &&
                    <ProfileCard
                        user={user}
                    />
                }

                {activeTab === 'payments' &&
                    <PaymentsCard
                        payments={payments}
                    />
                }

                {activeTab === 'tickets' &&
                    <TicketsCard
                        tickets={tickets}
                    />
                }

                {activeTab === 'meetings' &&
                    <MeetingsCard
                        meetings={meetings}
                    />
                }
            </PageContent>

            <ProfileDialogForm
                open={isProfileDialogOpen}
                profile={user}
                onClose={() => setProfileDialogOpen(false)}
                onSubmit={handleProfileFormSubmit}
            />
        </Page>
    );
}