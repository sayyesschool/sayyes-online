import { useCallback, useEffect, useRef, useState } from 'react';
import {
    Button,
    Dialog,
    Text
} from '@fluentui/react-northstar';

import storage from 'shared/services/storage';
import { useBoolean } from 'shared/hooks/state';
import VideoPlayer from 'shared/components/video-player';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import Icon from 'shared/components/material-icon';
import TextEditor from 'shared/components/text-editor';

export default function ExerciseVideoItem({ item, uploadPath, onUpdate }) {
    const fileInputRef = useRef();
    const textEditorRef = useRef();

    const [file, setFile] = useState();
    const [isDialogOpen, toggleDialogOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);
    const [isLoading, toggleLoading] = useBoolean(false);
    const [showScript, toggleScript] = useBoolean(false);

    useEffect(() => {
        return () => {
            if (file) URL.revokeObjectURL(file.url);
        };
    }, [file]);

    const handleAdd = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleEdit = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileChange = useCallback(event => {
        const file = event.target.files[0];

        if (file) {
            file.url = URL.createObjectURL(file);

            setFile(file);
            toggleDialogOpen(true);
        }
    }, []);

    const handleSave = useCallback(() => {
        const script = textEditorRef.current.editor.getData();

        onUpdate({
            audio: {
                ...item.audio,
                script
            }
        });
    }, [item.audio, onUpdate]);

    const handleUpload = useCallback(() => {
        if (file) {
            toggleLoading(true);

            storage.upload(file, {
                path: item.audio?.src || uploadPath
            }).then(response => {
                onUpdate({
                    audio: {
                        src: response.data.url,
                        script: item.audio?.script || ''
                    }
                });
            })
                .catch(console.error)
                .finally(() => {
                    toggleLoading(false);
                    toggleDialogOpen(false);
                });
        }
    }, [item.audio, file, uploadPath]);

    const handleDelete = useCallback(() => {
        toggleLoading(true);

        storage.delete(item.audio?.src)
            .then(() => {
                toggleLoading(false);
                toggleConfirmationDialogOpen(false);
                onUpdate({
                    audio: null
                });
            })
            .catch(console.error);
    }, [item.audio]);

    return (
        <div>
            <input
                ref={fileInputRef}
                type="file"
                accept="audio/mpeg"
                onChange={handleFileChange}
            />

            {item.audio?.src ?
                <>
                    <VideoPlayer
                        src={item.audio.src}
                    />

                    <Button
                        type="button"
                        icon={<Icon>edit</Icon>}
                        iconOnly
                        text
                        onClick={handleEdit}
                    />

                    <Button
                        type="button"
                        icon={<Icon>delete</Icon>}
                        iconOnly
                        text
                        onClick={toggleConfirmationDialogOpen}
                    />

                    <TextEditor
                        ref={textEditorRef}
                        value={item.audio.script}
                    />
                </>
                :
                <Button
                    type="button"
                    content="Выбрать файл"
                    tinted
                    onClick={handleAdd}
                />
            }

            <Dialog
                header="Загрузка видео"
                open={isDialogOpen}
                className="video-upload-dialog"
                content={file && {
                    content: <>
                        <AudioPlayer
                            src={file.url}
                        />
                        <Text as="p">Название: <Text temporary>{file.name}</Text></Text>
                        <Text as="p">Размер: <Text temporary>{Math.round(file.size / 1000)} КБ</Text></Text>
                    </>
                }}
                cancelButton={{
                    type: 'button',
                    content: 'Отменить',
                    onClick: toggleDialogOpen
                }}
                confirmButton={{
                    type: 'button',
                    content: 'Загрузить',
                    loading: isLoading,
                    disabled: isLoading,
                    onClick: handleUpload
                }}
            />

            <ConfirmationDialog
                title="Удалить видео?"
                message="Файл будет удалено без возможности восстановления."
                open={isConfirmationDialogOpen}
                onConfirm={handleDelete}
                onClose={toggleConfirmationDialogOpen}
            />
        </div>
    );
}