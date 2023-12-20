import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyTooltip from '@mui/joy/Tooltip';

const Tooltip = forwardRef(({
    anchor,
    content,

    className,
    children = anchor,
    ...props
}, ref) => {
    const classNames = classnames('ui-Tooltip', className);

    return (
        <JoyTooltip
            ref={ref}
            className={classNames}
            title={content}
            {...props}
        >
            {children}
        </JoyTooltip>
    );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;