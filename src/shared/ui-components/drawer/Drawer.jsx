import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyDrawer from '@mui/joy/Drawer';

const Drawer = forwardRef(({
    content,
    start,
    end,
    open,

    children = content,
    className,
    ...props
}, ref) => {
    const classNames = classnames(className, 'ui-Drawer', {
        'ui-Drawer--open': open
    });

    return (
        <JoyDrawer
            ref={ref}
            className={classNames}
            open={open}
            {...props}
        >
            {children}
        </JoyDrawer>
    );
});

export default Drawer;