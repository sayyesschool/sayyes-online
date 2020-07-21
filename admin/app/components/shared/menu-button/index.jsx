import React, { useRef, useState, useCallback } from 'react';
import {
    Icon,
    IconButton,
    Menu, MenuSurface, MenuItem
} from 'mdc-react';

export default function MenuButton({ button, items, onChange }) {
    const anchorRef = useRef();
    const [isOpen, setOpen] = useState(false);
    const handleOpen = useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => setOpen(false), []);
    //const handleSelect = useCallback(key => onChange(key), []);

    return (
        <div className="menu-button" ref={anchorRef}>
            {React.isValidElement(button) ?
                React.cloneElement(button, {
                    onClick: handleOpen
                })
                :
                <IconButton onClick={handleOpen}>
                    <Icon>more_vert</Icon>
                </IconButton>
            }

            <MenuSurface
                anchor={anchorRef.current}
                open={isOpen}
                top right
                belowAnchor
                onClose={handleClose}
            >
                <Menu>
                    {items.map(item =>
                        <MenuItem {...item} />
                    )}
                </Menu>
            </MenuSurface>
        </div>
    );
}