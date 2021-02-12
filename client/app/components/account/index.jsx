import React, { useState, useCallback } from 'react';
import {
    Avatar,
    Icon,
    TabBar, Tab,
    Typography
} from 'mdc-react';

import { useStore } from 'shared/hooks/store';
import { actions as userActions } from 'shared/store/modules/user';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import ProfileCard from 'app/components/account/profile-card';
import PaymentsCard from 'app/components/account/payments-card';
import TicketsCard from 'app/components/account/tickets-card';
import MeetingsCard from 'app/components/account/meetings-card';
import ProfileForm from 'app/components/account/profile-form';

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
            <PageHeader
                overline="Мой аккаунт"
                graphic={<Avatar className="user-avatar" text={user.initials} large />}
                title={user.fullname}
                withTabs
            >
                <TabBar value={activeTab} onChange={setActiveTab} minWidth align="center">
                    <Tab value="profile" icon={<Icon>person</Icon>} label="Профиль" />
                    <Tab value="payments" icon={<Icon>payment</Icon>} label="Платежи" />
                    <Tab value="lessons" icon={<Icon>school</Icon>} label="Уроки" />
                    <Tab value="tickets" icon={<Icon>local_activity</Icon>} label="Билеты" />
                    <Tab value="meetings" icon={<Icon>event</Icon>} label="Встречи" />
                </TabBar>
            </PageHeader>

            <PageContent>
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
        </Page>
    );
}