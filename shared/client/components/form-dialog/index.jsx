import React from 'react';
import {
    Button,
    Dialog
} from 'mdc-react';

import './index.scss';

export default function FormDialog({
    title,
    open,
    submitButtonText = 'Сохранить',
    children,
    confirmation,
    form = children?.props.id,
    onClose,
    onSubmit,
    ...props
}) {
    return (
        <Dialog
            className="form-dialog"
            title={title}
            open={open}
            {...props}
        >
            <Dialog.Content>
                {children}
            </Dialog.Content>

            <Dialog.Actions>
                <Button type="button" onClick={onClose}>Закрыть</Button>
                <Button type="submit" form={form} outlined onClick={onSubmit}>{submitButtonText}</Button>
            </Dialog.Actions>
        </Dialog>
    );
}