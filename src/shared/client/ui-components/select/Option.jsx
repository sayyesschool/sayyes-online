import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyOption from '@mui/joy/Option';

const Option = forwardRef(({
    content,

    children = content,
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Option', className);

    return (
        <JoyOption
            ref={ref}
            className={classNames}
            {...props}
        >
            {children}
        </JoyOption>
    );
});

export default Option;