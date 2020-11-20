import React, { forwardRef, useCallback } from 'react';

export default forwardRef(Form);

function Form({
    preventDefault = true,
    novalidate = false,
    onSubmit = Function.prototype,

    children,
    ...props
}, ref) {
    const handleSubmit = useCallback(event => {
        if (event && preventDefault) {
            event.preventDefault();
        }

        if (novalidate || event.target.checkValidity()) {
            onSubmit(event);
        } else {
            event.target.reportValidity();
        }
    }, [preventDefault, novalidate, onSubmit]);

    return (
        <form
            ref={ref}
            onSubmit={handleSubmit}
            {...props}
        >
            <input type="hidden" name="_csrf" value={window.CSRF_TOKEN} />

            {children}
        </form>
    );
}