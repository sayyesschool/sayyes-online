import { useCallback, useState } from 'react';
import { Avatar } from '@fluentui/react-northstar';

import { useStore } from 'shared/hooks/store';
import { actions as userActions } from 'shared/store/modules/user';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import Tabs from 'shared/components/tabs';

// import ProfileCard from 'app/components/account/profile-card';
// import PaymentsCard from 'app/components/account/payments-card';
// import TicketsCard from 'app/components/account/tickets-card';
// import MeetingsCard from 'app/components/account/meetings-card';
import ProfileForm from 'app/components/account/profile-form';

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
            <PageHeader
                overline="Мой аккаунт"
                graphic={<Avatar name={user.initials} />}
                title={user.fullname}
                withTabs
            >
                <Tabs
                    items={tabItems}
                />
            </PageHeader>

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