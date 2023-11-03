import { forwardRef, useCallback } from 'react';
import classnames from 'classnames';

const Form = forwardRef(({
    preventDefault = true,
    onSubmit = Function.prototype,

    className,
    ...props
}, ref) => {
    const classNames = classnames(className, 'ui-Form');

    const handleSubmit = useCallback(event => {
        if (preventDefault)
            event.preventDefault();

        onSubmit(event);
    }, [preventDefault, onSubmit]);

    return (
        <form
            ref={ref}
            className={classNames}
            onSubmit={handleSubmit}
            {...props}
        />
    );
});

export default Form;