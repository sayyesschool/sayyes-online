import { forwardRef } from 'react';
import classnames from 'classnames';

const Label = forwardRef(({
    content,
    horizontal,

    className,
    children,
    ...props
}, ref) => {
    const classNames = classnames('ui-Label', {
        'ui-Label--horizontal': horizontal
    }, className);

    return (
        <label
            ref={ref}
            className={classNames}
            {...props}
        >
            <span className="ui-Label__content">{content}</span>
            {children}
        </label>
    );
});

export default Label;