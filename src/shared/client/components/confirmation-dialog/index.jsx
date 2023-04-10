import { useCallback, useEffect } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { Dialog } from 'shared/ui-components';

export default function ConfirmationDialog({
    open,
    title = 'Подтвердите действие',
    message,
    content = message,
    cancelButtonContent = 'Отменить',
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
            withCloseButton={false}
            {...props}
        />
    );
}