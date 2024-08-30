
import ProfileAvatar from './ProfileAvatar';
import ProfileForm from './ProfileForm';

import styles from './Profile.module.scss';

export default function Profile({ user, updateProfile, updateAvatar }) {
    return (
        <div className={styles.root}>
            <ProfileAvatar profile={user} updateAvatar={updateAvatar} />
            <ProfileForm profile={user} updateProfile={updateProfile} />
        </div>
    );
}