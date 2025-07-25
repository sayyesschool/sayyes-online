import { useCallback, useState } from 'react';

import ImageField from 'shared/components/image-field';
import { useNotificationActions } from 'shared/hooks/notification';
import Storage from 'shared/services/storage';
import { Avatar, Skeleton } from 'shared/ui-components';

import styles from './ProfileAvatar.module.scss';

const emptyAvatarSrc = 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg';

export default function ProfileAvatar({ user, onChange }) {
    const { showNotification } = useNotificationActions();

    const [isLoading, setLoading] = useState(false);

    const handleChange = useCallback(file => {
        if (!(file instanceof File)) return;

        setLoading(true);

        return Storage.upload(file, { path: `avatars/${user.id}.${file.extension}` })
            .then(response => {
                onChange({
                    image: { path: response.data.path }
                });
            })
            .catch(error => {
                showNotification({
                    type: 'error',
                    text: error.message ?? error
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [user.id, showNotification, onChange]);

    const handleDelete = useCallback(image => {
        if (!image.path) return;

        setLoading(true);

        return Storage.delete(image.path)
            .then(() => {
                onChange({ image: {} });
            }).catch(error => {
                showNotification({
                    type: 'error',
                    text: error.message ?? error
                });
            }).finally(() => {
                setLoading(false);
            });
    }, [showNotification, onChange]);

    const image = user.image;

    return (
        <div className={styles.root}>
            <div className={styles.main}>
                <Avatar
                    key={isLoading}
                    className={styles.avatar}
                    imageUrl={isLoading ? '' : (image?.url || image?.src || emptyAvatarSrc)}
                >
                    <Skeleton loading={isLoading} />
                </Avatar>
            </div>

            <ImageField
                className={styles.field}
                image={image}
                disabled={isLoading}
                noImage
                onChange={handleChange}
                onDelete={handleDelete}
            />
        </div>
    );
}