import React from 'react';
import {
    Button,
    Dialog
} from 'mdc-react';

export default function ConfirmationDialog({
    title,
    message,
    open,
    onClose,
    onConfirm,
    ...props
}) {
    return (
        <Dialog
            open={open}
            title={title}
            content={message}
            {...props}
        >
            <Dialog.Actions>
                <Button label="Нет" onClick={onClose} />
                <Button label="Да" outlined onClick={onConfirm} />
            </Dialog.Actions>
        </Dialog>
    );
}