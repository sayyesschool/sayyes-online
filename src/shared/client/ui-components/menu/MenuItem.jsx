import { forwardRef, useCallback, useState } from 'react';
import classnames from 'classnames';

import Popup from '@mui/base/PopperUnstyled';
import MenuList from '@mui/joy/MenuList';
import JoyMenuItem from '@mui/joy/MenuItem';

const MenuItem = forwardRef(({
    value,
    content,
    items,
    onClick = Function.prototype,
    onClicked = Function.prototype,
    onMenuClose = Function.prototype,

    children = content,
    ...props
}, ref) => {
    const [anchorElement, setAnchorElement] = useState();

    const [open, setOpen] = useState(false);

    const handleClick = useCallback(event => {
        onClick(event, { value });

        if (items) {
            setAnchorElement(event.currentTarget);
            setOpen(true);
        }

        onClicked(event, {
            value,
            shouldClose: !items
        });
    }, [value, items, onClick, onClicked]);

    const classNames = classnames('ui-MenuItem');

    return (
        <JoyMenuItem
            ref={ref}
            className={classNames}
            onClick={handleClick}
            {...props}
        >
            {children}

            {items &&
                <Popup
                    open={open}
                    anchorEl={anchorElement}
                    placement="right-start"
                    modifiers={[
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 4]
                            }
                        }
                    ]}
                >
                    <MenuList>
                        {items?.map(item =>
                            <MenuItem
                                {...item}
                            />
                        )}
                    </MenuList>
                </Popup>
            }
        </JoyMenuItem>
    );
});

export default MenuItem;