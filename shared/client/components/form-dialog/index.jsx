import React from 'react';
import {
    Button,
    Dialog
} from 'mdc-react';

export default function FormDialog({
    form,
    title,
    open,
    submitButtonText = 'Сохранить',
    children,
    confirmation,
    onClose,
    ...props
}) {
    return (
        <Dialog
            open={open}
            title={title}
            {...props}
        >
            <Dialog.Content>
                {children}
            </Dialog.Content>

            <Dialog.Actions>
                <Button type="button" outlined onClick={onClose}>Закрыть</Button>
                <Button type="submit" form={form} unelevated>{submitButtonText}</Button>
            </Dialog.Actions>
        </Dialog>
    );
}