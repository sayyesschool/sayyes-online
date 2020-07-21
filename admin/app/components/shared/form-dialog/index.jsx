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
    onDismiss,
    ...props
}) {
    return (
        <Dialog
            open={open}
            title={title}
            {...props}
        >
            {children}

            <Dialog.Actions>
                <Button type="button" onClick={onDismiss}>Закрыть</Button>
                <Button type="submit" form={form} outlined>Сохранить</Button>
            </Dialog.Actions>
        </Dialog>
    );
}