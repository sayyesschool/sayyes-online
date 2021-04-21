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
    buttonProps = {},
    listProps = {},
    menuProps = {},
    className
}) {
    const anchorRef = useRef();

    const [isOpen, setOpen] = useState(false);

    const handleOpen = useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => setOpen(false), []);

    return (
        <div ref={anchorRef} className={classnames(className, 'menu-button')}>
            {React.isValidElement(button) ?
                React.cloneElement(button, {
                    disabled,
                    onClick: handleOpen,
                    ...buttonProps
                })
                :
                <IconButton
                    icon={icon || 'more_vert'}
                    disabled={disabled}
                    onClick={handleOpen}
                    {...buttonProps}
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