import moment from 'moment';

import DetailsList from 'shared/components/details-list';
import PageSection from 'shared/components/page-section';
import { useBoolean } from 'shared/hooks/state';
import IconButton from 'shared/ui-components/icon-button';

import ProfileForm from 'lk/components/account/profile-form';

export default function ProfileCard({ user }) {
    const [isEditing, toggleEditing] = useBoolean(false);

    return (
        <PageSection
            title="Профиль"
            actions={isEditing ?
                [
                    <IconButton
                        key="save"
                        icon="save"
                        onClick={toggleEditing}
                    />,
                    <IconButton
                        key="close"
                        icon="close"
                        onClick={toggleEditing}
                    />
                ]
                :
                <IconButton
                    icon="edit"
                    onClick={toggleEditing}
                />
            }
        >

            {isEditing ?
                <ProfileForm
                    profile={user}
                />
                :
                <DetailsList
                    items={[
                        {
                            icon: 'person',
                            header: user.fullname,
                            content: 'Имя и фамилия'
                        },
                        {
                            icon: 'email',
                            header: user.email,
                            content: 'Электронная почта'
                        },
                        {
                            icon: 'phone',
                            header: user.phone || '[Не указан]',
                            content: 'Электронная почта'
                        },
                        {
                            icon: 'cake',
                            header: moment(user.dob).format('DD.MM.YYYY'),
                            content: 'Дата рождения'
                        },
                        {
                            icon: 'public',
                            header: user.timezone || '[Не указан]',
                            content: 'Часовой пояс'
                        }
                    ]}
                />
            }
        </PageSection>
    );
}