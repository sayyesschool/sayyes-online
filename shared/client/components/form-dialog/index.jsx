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
            actions={[
                <Button key="close" type="button" onClick={onClose}>Закрыть</Button>,
                <Button key="submit" type="submit" form={form} outlined onClick={onSubmit}>{submitButtonText}</Button>
            ]}
            onClose={onClose}
            {...props}
        >
            {children}
        </Dialog>
    );
}