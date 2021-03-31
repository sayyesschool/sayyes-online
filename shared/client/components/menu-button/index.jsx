import React, { useRef, useState, useCallback } from 'react';
import {
    IconButton,
    Menu, MenuItem
} from 'mdc-react';
import classnames from 'classnames';

export default function MenuButton({
    button,
    icon,
    disabled,
    items = [],
    listProps = {},
    menuProps = {},
    className
}) {
    const anchorRef = useRef();
    const [isOpen, setOpen] = useState(false);
    const handleOpen = useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => setOpen(false), []);

    return (
        <div ref={anchorRef}>
            {React.isValidElement(button) ?
                React.cloneElement(button, {
                    className,
                    disabled,
                    onClick: handleOpen
                })
                :
                <IconButton
                    className={className}
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
                listProps={listProps}
                {...menuProps}
            >
                {items.filter(item => !!item).map(item =>
                    <MenuItem {...item} />
                )}
            </Menu>
        </div>
    );
}