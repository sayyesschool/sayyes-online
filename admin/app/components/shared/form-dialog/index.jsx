import React from 'react';
import {
    Button,
    Dialog
} from 'mdc-react';

export default function FormDialog({
    form,
    title,
    open,
    children,
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
                <Button type="button" onClick={onClose}>Закрыть</Button>
                <Button type="submit" form={form} outlined>Сохранить</Button>
            </Dialog.Actions>
        </Dialog>
    );
}