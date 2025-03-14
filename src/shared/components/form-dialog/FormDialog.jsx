import { cloneElement, useCallback, useEffect, useRef } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { Button, Dialog } from 'shared/ui-components';

export default function FormDialog({
    open,
    title,
    content,
    submitButtonText = 'Сохранить',
    children = content,
    form = children?.props?.id,
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

        onSubmitRef?.current(event).finally(() => toggleSubmitting(false));
    }, []);

    return (
        <Dialog
            className="FormDialog"
            open={open}
            title={title}
            layout="center"
            content={cloneElement(children, {
                onSubmit: handleSubmit
            })}
            actions={[
                <Button
                    key="submit"
                    type="submit"
                    form={form}
                    content={submitButtonText}
                    disabled={isSubmitting}
                    loading={isSubmitting}
                />
            ]}
            onClose={onClose}
            {...props}
        />
    );
}