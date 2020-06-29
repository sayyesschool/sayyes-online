import React from 'react';
import {
    Button, ButtonType,
    Dialog, DialogType, DialogFooter,
} from '@fluentui/react';

export default function ConfirmationDialog({
    title,
    message,
    isOpen,
    onClose,
    onConfirm,
    ...props
}) {
    return (
        <Dialog
            type={DialogType.close}
            title={title}
            subText={message}
            hidden={!isOpen}
            {...props}
        >
            <DialogFooter>
                <Button buttonType={ButtonType.default} text="Нет" onClick={onClose} />
                <Button buttonType={ButtonType.primary} text="Да" onClick={onConfirm} />
            </DialogFooter>
        </Dialog>
    );
}