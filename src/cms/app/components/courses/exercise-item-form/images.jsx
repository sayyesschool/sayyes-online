import { useCallback, useRef, useState } from 'react';

import { useFileInput } from 'shared/hooks/file';
import { useBoolean } from 'shared/hooks/state';
import storage from 'shared/services/storage';
import { Button, Card, Flex, Image } from 'shared/ui-components';

import './index.scss';

export default function ExerciseImages({ className, images, uploadPath, onUpdate }) {
    const altInputRef = useRef();

    const { file, pick } = useFileInput({ accept: 'image/jpeg,image/png,image/jpeg,image/webp' });

    const [currentImage, setCurrentImage] = useState();
    const [isLoading, toggleLoading] = useBoolean(false);

    const handleEditRequest = useCallback(image => {
        setCurrentImage(image);
        fileInputRef.current?.click();
    }, []);

    const handleDeleteRequest = useCallback(image => {
        setCurrentImage(image);
        toggleConfirmationDialogOpen(true);
    }, []);

    const handleAdd = useCallback(() => {
        if (file) {
            toggleLoading(true);

            storage.upload(file, {
                path: uploadPath
            }).then(response => {
                onUpdate({
                    images: images.concat({
                        src: response.data.url,
                        alt: ''
                    })
                });
            }).finally(() => {
                toggleLoading(false);
                toggleDialogOpen(false);
            });
        }
    }, [file, images, uploadPath, onUpdate]);

    const handleEdit = useCallback(() => {
        if (file) {
            toggleLoading(true);

            storage.upload(file, {
                path: currentImage.src
            }).then(response => {
                onUpdate({
                    images: images.map(image => image.src !== response.data.url ? image : ({ ...image, src: response.data.url }))
                });
            }).finally(() => {
                toggleLoading(false);
                toggleDialogOpen(false);
            });
        }
    }, [file, images, currentImage, onUpdate]);

    const handleDelete = useCallback(() => {
        toggleLoading(true);

        storage.delete(currentImage.src)
            .then(response => {
                onUpdate({
                    images: images.filter(image => image.src !== response.data.url)
                });
            })
            .finally(() => {
                toggleLoading(false);
                toggleConfirmationDialogOpen(false);
            });
    }, [currentImage, images, onUpdate]);

    return (
        <Flex>
            {images?.map(image =>
                <Card key={image.id}>
                    <Card.TopControls>
                        <Button
                            icon="edit"
                            text
                            onClick={() => handleEditRequest(image)}
                        />

                        <Button
                            icon="delete"
                            text
                            onClick={() => handleDeleteRequest(image)}
                        />
                    </Card.TopControls>

                    <Card.Preview fitted>
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fluid
                        />
                    </Card.Preview>
                </Card>
            )}

            <Button
                icon="add"
                content="Добавить"
                onClick={pick}
            />
        </Flex>
    );
}