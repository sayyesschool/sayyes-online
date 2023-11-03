import { useCallback, useRef, useState } from 'react';
import classnames from 'classnames';

import storage from 'shared/services/storage';
import { useBoolean } from 'shared/hooks/state';
import { Button, Dialog, Icon, Image, Input, Text } from 'shared/ui-components';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import PageSection from 'shared/components/page-section';

import './index.scss';

export default function ImageSection({ className, image, uploadPath, onUpdate, onDelete }) {
    const fileInputRef = useRef();
    const altInputRef = useRef();

    const [file, setFile] = useState();
    const [isDialogOpen, toggleDialogOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);
    const [isLoading, toggleLoading] = useBoolean(false);
    const [isEditing, toggleEditing] = useBoolean(false);

    const handleSave = useCallback(() => {

    }, []);

    const handleAdd = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleUpload = useCallback(() => {
        if (file) {
            toggleLoading(true);

            storage.upload(file, {
                path: image?.src || uploadPath
            }).then(response => {
                onUpdate({
                    path: response.data.path,
                    alt: image?.alt
                });
            })
                .catch(console.error)
                .finally(() => {
                    fileInputRef.current.value = '';
                    URL.revokeObjectURL(file.url);
                    setFile(null);
                    toggleLoading(false);
                    toggleDialogOpen(false);
                });
        }
    }, [image, file, uploadPath]);

    const handleDelete = useCallback(() => {
        toggleLoading(true);

        storage.delete(image.path)
            .then(() => {
                toggleLoading(false);
                toggleConfirmationDialogOpen(false);
                onDelete(null);
            })
            .catch(console.error);
    }, [image]);

    const handleFileChange = useCallback(event => {
        const file = event.target.files[0];

        if (file) {
            file.url = URL.createObjectURL(file);

            setFile(file);
            toggleDialogOpen(true);
        }
    }, []);

    const classNames = classnames('image-section', className);

    return (
        <PageSection
            title="Изображение"
            className={classNames}
            actions={isLoading ?
                <LoadingIndicator
                    size="sm"
                />
                :
                (!image?.url ?
                    <Button
                        icon={<Icon>add</Icon>}
                        iconOnly
                        text
                        onClick={handleAdd}
                    />
                    :
                    <>
                        <Button
                            icon={<Icon>edit</Icon>}
                            iconOnly
                            text
                            onClick={toggleEditing}
                        />

                        <Button
                            icon={<Icon>delete</Icon>}
                            iconOnly
                            text
                            onClick={toggleConfirmationDialogOpen}
                        />
                    </>
                )
            }
        >
            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/jpeg"
                onChange={handleFileChange}
            />

            {isEditing ?
                <form>
                    <Input
                        label="URL"
                        fluid
                    />

                    <Input
                        label="Описание"
                        fluid
                    />
                </form>
                :
                <figure>
                    <Image
                        src={image?.url}
                        alt={image?.alt}
                        fluid
                    />
                </figure>
            }

            <Dialog
                header="Загрузка изображения"
                open={isDialogOpen}
                className="image-upload-dialog"
                content={file && {
                    content: <>
                        <Image
                            src={file.url}
                            fluid
                        />
                        <Text as="p">Название: <Text temporary>{file.name}</Text></Text>
                        <Text as="p">Размер: <Text temporary>{Math.round(file.size / 1000)} КБ</Text></Text>
                    </>
                }}
                cancelButton={{
                    content: 'Отменить',
                    onClick: toggleDialogOpen
                }}
                confirmButton={{
                    content: 'Загрузить',
                    loading: isLoading,
                    disabled: isLoading,
                    onClick: handleUpload
                }}
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