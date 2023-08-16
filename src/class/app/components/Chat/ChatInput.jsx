import { useCallback, useEffect, useRef, useState } from 'react';

import { ButtonGroup, IconButton, Textarea } from 'shared/ui-components';

const ALLOWED_FILE_TYPES =
    'audio/*, image/*, text/*, video/*, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document .xslx, .ppt, .pdf, .key, .svg, .csv';

export default function ChatInput({
    editingMessage,
    onSubmitMessage,
    onSendFile,
    onTyping,
    onCancelEditing
}) {
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const submitButtonRef = useRef();

    const [isSendingFile, setIsSendingFile] = useState(false);
    const [fileSendError, setFileSendError] = useState(null);

    useEffect(() => {
        if (editingMessage) {
            const textarea = textareaRef.current;
            textarea.value = editingMessage.body;
            textarea?.focus();
        }
    }, [editingMessage]);

    const handleKeyPress = useCallback(event => {
        onTyping?.();

        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();

            const value = event.target.value?.trim();

            if (!value) return;

            event.target.value = '';
            event.target.focus();
            onSubmitMessage(value);
        }
    }, [onSubmitMessage]);

    const handleSendFile = useCallback(event => {
        const file = event.target.files?.[0];

        if (!file) return;

        const formData = new FormData();
        formData.append('userfile', file);

        setIsSendingFile(true);
        setFileSendError(null);

        onSendFile(file)
            .catch((e) => {
                if (e.code === 413) {
                    setFileSendError('File size is too large. Maximum file size is 150MB.');
                } else {
                    setFileSendError('There was a problem uploading the file. Please try again.');
                }
                console.log('Problem sending file: ', e);
            })
            .finally(() => {
                setIsSendingFile(false);
            });
    }, [onSendFile]);

    const handleSubmitButtonClick = useCallback(() => {
        const value = textareaRef.current.value;

        if (!value) return;

        textareaRef.current.value = '';
        onSubmitMessage(value);
    }, [onSubmitMessage]);

    const handleCancelButtonClick = useCallback(() => {
        if (textareaRef.current) {
            textareaRef.current.value = '';
        }
        onCancelEditing();
    }, [onCancelEditing]);

    console.log('ChatInput editingMessage', editingMessage);

    return (
        <div className="ChatInput">
            {/* Since the file input element is invisible, we can hardcode an empty string as its value. This allows users to upload the same file multiple times. */}
            {/* <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={handleSendFile}
                value={''}
                accept={ALLOWED_FILE_TYPES}
            /> */}

            <Textarea
                placeholder="Сообщение"
                slotProps={{
                    textarea: {
                        ref: textareaRef
                    }
                }}
                startDecorator={editingMessage && 'Редактирование сообщения'}
                endDecorator={<>
                    {!editingMessage ?
                        <ButtonGroup sx={{ marginLeft: 'auto' }}>
                            {/* <IconButton disabled={isSendingFile} /> */}
                            <IconButton
                                ref={submitButtonRef}
                                type="submit"
                                icon="send"
                                title="Отправить"
                                onClick={handleSubmitButtonClick}
                            />
                        </ButtonGroup>
                        :
                        <ButtonGroup sx={{ marginLeft: 'auto' }}>
                            <IconButton
                                type="reset"
                                icon="close"
                                color="danger"
                                title="Отменить"
                                sx={{ marginLeft: 'auto' }}
                                onClick={handleCancelButtonClick}
                            />

                            <IconButton
                                type="submit"
                                icon="check"
                                color="success"
                                title="Принять"
                                onClick={handleSubmitButtonClick}
                            />
                        </ButtonGroup>
                    }
                </>}
                onKeyPress={handleKeyPress}
            />
        </div>
    );
}