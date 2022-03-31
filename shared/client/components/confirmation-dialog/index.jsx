import { useCallback, useEffect } from 'react';
import { Dialog } from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';

export default function ConfirmationDialog({
    title = 'Подтвердите действие',
    message,
    open,
    cancelButtonContent = 'Отмена',
    confirmButtonContent = 'Подтвердить',
    onConfirm,
    onClose,
    ...props
}) {
    const [isConfirmButtonDisabled, toggleConfirmButtonDisabled] = useBoolean(false);

    useEffect(() => {
        if (!open) {
            toggleConfirmButtonDisabled(false);
        }
    }, [open]);

    const handleConfirm = useCallback(() => {
        toggleConfirmButtonDisabled(true);
        onConfirm();
    }, [onConfirm]);

    return (
        <Dialog
            open={open}
            header={title}
            content={message}
            cancelButton={{
                type: 'button',
                content: cancelButtonContent,
                onClick: onClose
            }}
            confirmButton={{
                type: 'button',
                content: confirmButtonContent,
                primary: true,
                disabled: isConfirmButtonDisabled,
                loading: isConfirmButtonDisabled,
                onClick: handleConfirm
            }}
            {...props}
        />
    );
}