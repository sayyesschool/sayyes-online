import { useCallback, useEffect, useState } from 'react';

import { Dialog } from 'shared/ui-components';

export default function ConfirmationDialog({
    open,
    title = 'Подтвердите действие',
    message,
    content = message,
    cancelButtonContent = 'Отменить',
    confirmButtonContent = 'Подтвердить',
    closeAfterConfirm = false,
    onConfirm,
    onClose,
    children = content,
    ...props
}) {
    const [isConfirmButtonDisabled, toggleConfirmButtonDisabled] = useState(false);

    useEffect(() => {
        if (!open) {
            toggleConfirmButtonDisabled(false);
        }
    }, [open]);

    const handleConfirm = useCallback(() => {
        onConfirm?.();

        if (closeAfterConfirm) {
            onClose?.();
        } else {
            toggleConfirmButtonDisabled(true);
        }
    }, [closeAfterConfirm, onConfirm, onClose]);

    return (
        <Dialog
            className="ConfirmationDialog"
            open={open}
            title={title}
            content={children}
            actions={[
                {
                    key: 'cancel',
                    type: 'button',
                    content: cancelButtonContent,
                    color: 'danger',
                    variant: 'soft',
                    onClick: onClose
                },
                {
                    key: 'confirm',
                    type: 'button',
                    content: confirmButtonContent,
                    color: 'success',
                    variant: 'soft',
                    disabled: isConfirmButtonDisabled,
                    loading: isConfirmButtonDisabled,
                    onClick: handleConfirm
                }
            ]}
            onClose={onClose}
            {...props}
        />
    );
}