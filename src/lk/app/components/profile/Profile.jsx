import UserAvatar from 'shared/components/user-avatar';
import UserProfileForm from 'shared/components/user-profile-form';

import styles from './Profile.module.scss';

export default function Profile({
    user,
    onAvatarChange,
    onProfileChange
}) {
    return (
        <div className={styles.root}>
            <UserAvatar
                user={user}
                onChange={onAvatarChange}
            />

            <UserProfileForm
                user={user}
                onSubmit={onProfileChange}
            />
        </div>
    );
}