import classnames from 'classnames';

import { Drawer } from 'shared/ui-components';

export default function PageDrawer({ className, children, ...props }) {
    const classNames = classnames(className, 'PageDrawer');

    return (
        <Drawer
            className={classNames}
            anchor="right"
            open
            disablePortal
            disableScrollLock
            hideBackdrop
            {...props}
        >
            {children}
        </Drawer>
    );
}