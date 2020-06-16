import React from 'react';

Form.defaultProps = {
    preventDefault: true,
    onSubmit: Function.prototype
};

export default function Form({ preventDefault, novalidate, onSubmit, children, ...props }) {
    const formElement = React.useRef();

    const handleSubmit = event => {
        if (event && preventDefault) {
            event.preventDefault();
        }

        if (novalidate || formElement.current.checkValidity()) {
            return onSubmit(event);
        } else {
            formElement.current.reportValidity();
        }
    };

    return (
        <form
            ref={formElement}
            onSubmit={handleSubmit}
            {...props}
        >
            <input type="hidden" name="_csrf" value={window.CSRF_TOKEN} />
            
            {children}
        </form>
    );
}