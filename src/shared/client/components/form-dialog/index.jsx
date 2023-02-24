import { cloneElement, useCallback, useEffect, useRef } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { Dialog, Icon } from 'shared/ui-components';

import './index.scss';

export default function FormDialog({
    open,
    title,
    content,
    submitButtonText = 'Сохранить',
    children = content,
    form = children?.props.id,
    onClose,
    ...props
}) {
    const onSubmitRef = useRef(children.props?.onSubmit);

    const [isSubmitting, toggleSubmitting] = useBoolean(false);

    useEffect(() => {
        if (!open) {
            toggleSubmitting(false);
        }
    }, [open]);

    useEffect(() => {
        onSubmitRef.current = children.props?.onSubmit;
    }, [children.props?.onSubmit]);

    const handleSubmit = useCallback(event => {
        toggleSubmitting(true);

        onSubmitRef?.current(event);
    }, []);

    return (
        <Dialog
            className="form-dialog"
            open={open}
            header={title}
            headerAction={{
                icon: <Icon>close</Icon>,
                title: 'Закрыть',
                onClick: onClose
            }}
            content={cloneElement(children, {
                onSubmit: handleSubmit
            })}
            confirmButton={{
                type: 'submit',
                form,
                content: submitButtonText,
                disabled: isSubmitting,
                loading: isSubmitting
            }}
            onClose={onClose}
            {...props}
        />
    );
}