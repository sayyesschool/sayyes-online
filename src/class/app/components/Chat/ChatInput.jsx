import { useCallback, useEffect, useRef, useState } from 'react';

import { IconButton, Textarea } from 'shared/ui-components';

const ALLOWED_FILE_TYPES =
    'audio/*, image/*, text/*, video/*, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document .xslx, .ppt, .pdf, .key, .svg, .csv';

export default function ChatInput({
    onSendMessage,
    onSendFile,
    onTyping
}) {
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const sendButtonRef = useRef();

    const [isSendingFile, setIsSendingFile] = useState(false);
    const [fileSendError, setFileSendError] = useState(null);

    // useEffect(() => {
    //     if (isChatWindowOpen) {
    //         textareaRef.current?.focus();
    //     }
    // }, [isChatWindowOpen]);

    const handleKeyPress = useCallback(event => {
        //onTyping();

        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();

            const value = event.target.value?.trim();

            if (!value) return;

            event.target.value = '';
            event.target.focus();
            onSendMessage(value);
        }
    }, [onSendMessage]);

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
                ref={textareaRef}
                defaultValue=""
                placeholder="Сообщение"
                endDecorator={<>
                    {/* <IconButton disabled={isSendingFile} /> */}

                    <IconButton
                        ref={sendButtonRef}
                        type="submit"
                        icon="send"
                        title="Отправить"
                        sx={{ marginLeft: 'auto' }}
                    />
                </>}
                onKeyPress={handleKeyPress}
            />
        </div>
    );
}