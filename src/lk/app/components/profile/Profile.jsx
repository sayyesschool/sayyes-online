
import ProfileAvatar from './ProfileAvatar';
import ProfileForm from './ProfileForm';

import styles from './Profile.module.scss';

export default function Profile({ user, updateProfile }) {
    return (
        <div className={styles.root}>
            <ProfileAvatar />
            <ProfileForm profile={user} updateProfile={updateProfile} />
        </div>
    );
}