import {
    Button,
    Dialog
} from 'mdc-react';

export default function ConfirmationDialog({
    title = 'Подтвердите действие',
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
            actions={[
                <Button
                    key="no"
                    type="button"
                    label="Нет"
                    onClick={onClose}
                />,
                <Button
                    key="yes"
                    type="button"
                    label="Да"
                    outlined
                    onClick={onConfirm}
                />
            ]}
            {...props}
        />
    );
}