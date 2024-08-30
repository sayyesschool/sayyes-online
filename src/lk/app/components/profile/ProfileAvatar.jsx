import { useCallback } from 'react';

import ImageFieldCropper from 'shared/components/image-field-cropper';
import Storage from 'shared/services/storage';

import styles from './ProfileAvatar.module.scss';

export default function ProfileAvatar({ profile, updateAvatar }) {
    const handleFileChange = useCallback(image => {
        updateAvatar({ image });
    }, [updateAvatar]);

    const handleFileDelete = useCallback(async path => {
        await Storage.delete(path).then(console.log);
    }, []);

    return (
        <div className={styles.root}>
            <ImageFieldCropper
                className={styles.imageField}
                image={profile.image}
                onChange={handleFileChange}
                onDelete={handleFileDelete}
            />
        </div>
    );
}