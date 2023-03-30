import { forwardRef } from 'react';
import classnames from 'classnames';

const TableBody = forwardRef(({
    className,
    children = content,
    ...props
}, ref) => {
    const classNames = classnames('ui-TableBody', className);

    return (
        <tbody
            ref={ref}
            className={classNames}
            {...props}
        >
            {children}
        </tbody>
    );
});

export default TableBody;