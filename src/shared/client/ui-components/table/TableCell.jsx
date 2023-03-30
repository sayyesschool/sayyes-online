import { forwardRef } from 'react';
import classnames from 'classnames';

const TableCell = forwardRef(({
    header,
    content,
    align,

    as: Tag = header ? 'th' : 'td',
    children = content,
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-TableCell', {
        'ui-TableCell--header': header
    }, className);

    return (
        <Tag
            ref={ref}
            className={classNames}
            style={align && {
                textAlign: align
            }}
            {...props}
        >
            {children}
        </Tag>
    );
});

export default TableCell;