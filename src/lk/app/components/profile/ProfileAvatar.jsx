import { Avatar, Button } from 'shared/ui-components';

import styles from './ProfileAvatar.module.scss';

export default function ProfileAvatar() {
    return (
        <div className={styles.root}>
            <Avatar
                variant="outlined"
                imageUrl="https://cdn-icons-png.flaticon.com/512/3270/3270919.png"
                sx={{ width: '200px', height: '200px' }}
            />

            <Button content="Редактировать" variant="soft" />
        </div>
    );
}