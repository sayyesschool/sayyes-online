import { useCallback, useState } from 'react';

import ImageField from 'shared/components/image-field';
import Storage from 'shared/services/storage';
import { Avatar, Skeleton } from 'shared/ui-components';

import styles from './UserAvatar.module.scss';

const emptyAvatarSrc = 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg';

export default function UserAvatar({ user, onChange }) {
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
            .finally(() => {
                setLoading(false);
            });
    }, [user.id, onChange]);

    const handleDelete = useCallback(image => {
        if (!image.path) return;

        setLoading(true);

        return Storage.delete(image.path).then(response => {
            onChange({ image: {} });
        }).finally(() => {
            setLoading(false);
        });
    }, [onChange]);

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