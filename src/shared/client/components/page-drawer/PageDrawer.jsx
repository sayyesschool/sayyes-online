import { Drawer } from 'mdc-react';
import classnames from 'classnames';

export default function PageDrawer({ className, children, ...props }) {
    const classNames = classnames('PageDrawer', className);

    return (
        <Drawer
            className={classNames}
            open
            appear
            dismissible
            {...props}
        >
            <Drawer.Content>
                {children}
            </Drawer.Content>
        </Drawer>
    );
}