import { forwardRef } from 'react';

import JoyDrawer from '@mui/joy/Drawer';
import classnames from 'classnames';

const Drawer = forwardRef(({
    content,
    open,

    children = content,
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Drawer', {
        'ui-Drawer--open': open
    }, className);

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

Drawer.displayName = 'Drawer';

export default Drawer;