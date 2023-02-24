import { useCallback, useEffect } from 'react';

import { useBoolean } from 'shared/hooks/state';
import Dialog from 'shared/ui-components/dialog';

export default function ConfirmationDialog({
    open,
    title = 'Подтвердите действие',
    message,
    content = message,
    cancelButtonContent = 'Отмена',
    confirmButtonContent = 'Подтвердить',
    onConfirm,
    onClose,
    children = content,
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
            content={children}
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