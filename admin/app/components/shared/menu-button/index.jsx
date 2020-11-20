import React, { useRef, useState, useCallback } from 'react';
import {
    Icon,
    IconButton,
    Menu, MenuItem
} from 'mdc-react';
import classnames from 'classnames';

export default function MenuButton({
    button,
    icon,
    disabled,
    items = [],
    menuProps = {},
    className
}) {
    const anchorRef = useRef();
    const [isOpen, setOpen] = useState(false);
    const handleOpen = useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => setOpen(false), []);

    const classNames = classnames('menu-button', className);

    return (
        <div ref={anchorRef} className={classNames}>
            {React.isValidElement(button) ?
                React.cloneElement(button, {
                    disabled,
                    onClick: handleOpen
                })
                :
                <IconButton
                    icon={icon || 'more_vert'}
                    disabled={disabled}
                    onClick={handleOpen}
                />
            }

            <Menu
                anchor={anchorRef.current}
                open={isOpen}
                onClose={handleClose}
                top right
                {...menuProps}
            >
                {items.filter(item => !!item).map(item =>
                    <MenuItem {...item} />
                )}
            </Menu>
        </div>
    );
}