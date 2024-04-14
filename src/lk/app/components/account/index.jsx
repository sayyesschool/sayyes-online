import { useCallback, useState } from 'react';

import Page from 'shared/components/page';
import { useStore } from 'shared/hooks/store';
import { actions as userActions } from 'shared/store/modules/user';
import Avatar from 'shared/ui-components/avatar';

// import ProfileCard from 'lk/components/account/profile-card';
// import PaymentsCard from 'lk/components/account/payments-card';
// import TicketsCard from 'lk/components/account/tickets-card';
// import MeetingsCard from 'lk/components/account/meetings-card';

import './index.scss';

const tabItems = [
    { key: 'profile', value: 'profile', icon: 'person', content: 'Профиль' },
    { key: 'payments', value: 'payments', icon: 'payment', content: 'Платежи' },
    { key: 'lessons', value: 'lessons', icon: 'school', content: 'Уроки' },
];

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
            <Page.Header
                overline="Мой аккаунт"
                graphic={<Avatar name={user.initials} />}
                title={user.fullname}
                tabs={tabItems}
            />

            {/* <PageContent>
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
            </PageContent> */}
        </Page>
    );
}