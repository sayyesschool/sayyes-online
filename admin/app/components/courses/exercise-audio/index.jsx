import { useCallback, useEffect, useRef, useState } from 'react';
import {
    Button,
    Dialog,
    Loader,
    Text
} from '@fluentui/react-northstar';

import storage from 'shared/services/storage';
import { useBoolean } from 'shared/hooks/state';
import AudioPlayer from 'shared/components/audio-player';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import Icon from 'shared/components/material-icon';
import PageSection from 'shared/components/page-section';
import TextEditor from 'shared/components/text-editor';

import './index.scss';

export default function ExerciseAudio({ exercise, uploadPath, onUpdate }) {
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
                ...exercise.audio,
                script
            }
        });
    }, [exercise.audio, onUpdate]);

    const handleUpload = useCallback(() => {
        if (file) {
            toggleLoading(true);

            storage.upload(file, {
                path: exercise.audio?.src || uploadPath
            }).then(response => {
                onUpdate({
                    audio: {
                        src: response.data.url,
                        script: exercise.audio?.script || ''
                    }
                });
            })
                .catch(console.error)
                .finally(() => {
                    toggleLoading(false);
                    toggleDialogOpen(false);
                });
        }
    }, [exercise.audio, file, uploadPath]);

    const handleDelete = useCallback(() => {
        toggleLoading(true);

        storage.delete(exercise.audio?.src)
            .then(() => {
                toggleLoading(false);
                toggleConfirmationDialogOpen(false);
                onUpdate({
                    audio: null
                });
            })
            .catch(console.error);
    }, [exercise.audio]);

    return (
        <PageSection
            title="Аудио"
            className="exercise-audio"
            actions={isLoading ?
                <Loader
                    size="small"
                />
                :
                (!exercise.audio?.src ?
                    <Button
                        icon={<Icon>add</Icon>}
                        iconOnly
                        text
                        onClick={handleAdd}
                    />
                    :
                    <>
                        <Button
                            icon={<Icon>{showScript ? 'subtitles_off' : 'subtitles'}</Icon>}
                            iconOnly
                            text
                            onClick={toggleScript}
                        />

                        <Button
                            icon={<Icon>save</Icon>}
                            iconOnly
                            text
                            onClick={handleSave}
                        />

                        <Button
                            icon={<Icon>edit</Icon>}
                            iconOnly
                            text
                            onClick={handleEdit}
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
                accept="audio/mpeg"
                onChange={handleFileChange}
            />

            {exercise.audio?.src &&
                <>
                    <AudioPlayer
                        src={exercise.audio.src}
                    />

                    {showScript &&
                        <TextEditor
                            ref={textEditorRef}
                            value={exercise.audio.script}
                        />
                    }
                </>
            }

            <Dialog
                header="Загрузка аудио"
                open={isDialogOpen}
                className="audio-upload-dialog"
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
                title="Удалить аудио?"
                message="Файл будет удалено без возможности восстановления."
                open={isConfirmationDialogOpen}
                onConfirm={handleDelete}
                onClose={toggleConfirmationDialogOpen}
            />
        </PageSection>
    );
}