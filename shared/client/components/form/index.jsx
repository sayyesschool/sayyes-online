import React, { useRef, useCallback } from 'react';

export default function Form({
    preventDefault = true,
    novalidate = false,
    onSubmit = Function.prototype,

    children,
    ...props
}) {
    const formRef = useRef();

    const handleSubmit = useCallback(event => {
        if (event && preventDefault) {
            event.preventDefault();
        }

        if (novalidate || formRef.current.checkValidity()) {
            onSubmit(event);
        } else {
            formRef.current.reportValidity();
        }
    }, [preventDefault, novalidate, onSubmit]);

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            {...props}
        >
            <input type="hidden" name="_csrf" value={window.CSRF_TOKEN} />

            {children}
        </form>
    );
}