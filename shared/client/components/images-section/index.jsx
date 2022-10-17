import { useCallback, useRef, useState } from 'react';
import classnames from 'classnames';

import storage from 'shared/services/storage';
import { useBoolean } from 'shared/hooks/state';
import { Button, Card, Flex, Icon, Image, Loader } from 'shared/ui-components';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import ImageDialog from 'shared/components/image-dialog';
import PageSection from 'shared/components/page-section';

import './index.scss';

export default function ImagesSection({ className, images, uploadPath, onUpdate }) {
    const fileInputRef = useRef();
    const altInputRef = useRef();

    const [file, setFile] = useState();
    const [currentImage, setCurrentImage] = useState();
    const [isDialogOpen, toggleDialogOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);
    const [isLoading, toggleLoading] = useBoolean(false);

    const handleFileChange = useCallback(event => {
        const file = event.target.files[0];

        if (file) {
            file.src = URL.createObjectURL(file);

            setFile(file);
            toggleDialogOpen(true);
        }
    }, []);

    const handleSave = useCallback(() => {
        altInputRef.current.value;
    }, []);

    const handleAddRequest = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

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

    const classNames = classnames('images-section', className);

    return (
        <PageSection
            title="Изображения"
            className={classNames}
            actions={isLoading ?
                <Loader
                    size="small"
                />
                :
                <Button
                    icon={<Icon>add</Icon>}
                    iconOnly
                    text
                    onClick={handleAddRequest}
                />
            }
        >
            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/jpeg"
                onChange={handleFileChange}
            />

            <Flex className="images-section__images">
                {images?.map(image =>
                    <Card key={image.id}>
                        <Card.TopControls>
                            <Button
                                icon={<Icon>edit</Icon>}
                                iconOnly
                                text
                                onClick={() => handleEditRequest(image)}
                            />

                            <Button
                                icon={<Icon>delete</Icon>}
                                iconOnly
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

                        {/* <Card.Footer>
                    <Input
                        ref={altInputRef}
                        label="Описание"
                        labelPosition="inside"
                        icon={
                            <Button
                                icon={<Icon>save</Icon>}
                                iconOnly
                                text
                                onClick={() => handleSave(image)}
                            />
                        }
                        inverted
                        fluid
                    />
                </Card.Footer> */}
                    </Card>
                )}
            </Flex>

            <ImageDialog
                header="Загрузка изображения"
                open={isDialogOpen}
                image={file}
                loading={isLoading}
                onCancel={toggleDialogOpen}
                onConfirm={currentImage ? handleEdit : handleAdd}
            />

            <ConfirmationDialog
                title="Удалить изображение?"
                message="Изображение будет удалено без возможности восстановления."
                open={isConfirmationDialogOpen}
                onConfirm={handleDelete}
                onClose={toggleConfirmationDialogOpen}
            />
        </PageSection>
    );
}