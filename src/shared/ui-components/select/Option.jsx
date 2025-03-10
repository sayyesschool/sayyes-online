import { forwardRef } from 'react';

import JoyOption from '@mui/joy/Option';
import classnames from 'classnames';

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

Option.displayName = 'Option';

export default Option;