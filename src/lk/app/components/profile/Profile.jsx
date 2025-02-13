import { Grid, Surface } from 'shared/ui-components';

import ProfileAvatar from './profile-avatar';
import ProfileForm from './profile-form';

import styles from './Profile.module.scss';

export default function Profile({
    user,
    onAvatarChange,
    onProfileChange
}) {
    return (
        <Surface
            className={styles.root}
            padding="lg"
            shadow="sm"
        >
            <Grid>
                <Grid.Item md="4">
                    <ProfileAvatar
                        user={user}
                        onChange={onAvatarChange}
                    />
                </Grid.Item>

                <Grid.Item md="8">
                    <ProfileForm
                        user={user}
                        onSubmit={onProfileChange}
                    />
                </Grid.Item>
            </Grid>
        </Surface>
    );
}