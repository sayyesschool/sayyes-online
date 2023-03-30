import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyTooltip from '@mui/joy/Tooltip';

const Tooltip = forwardRef(({
    content,

    className,
    children = content,
    ...props
}, ref) => {
    const classNames = classnames('ui-Tooltip', className);

    return (
        <JoyTypography
            ref={ref}
            className={classNames}
            {...props}
        >
            {children}
        </JoyTypography>
    );
});

export default Tooltip;