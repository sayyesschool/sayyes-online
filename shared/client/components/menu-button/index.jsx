import { cloneElement, isValidElement, useCallback, useRef, useState } from 'react';
import {
    IconButton,
    Menu
} from 'mdc-react';
import classnames from 'classnames';

<MenuButton
    trigger={<Button icon={<ExpandIcon />} content="Click" aria-label="Click button" />}
    menu={[
        '1',
        '2',
        '3',
        {
            content: 'submenu',
            menu: {
                items: ['4', '5'],
            },
        },
    ]}
    on="click"
/>;

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
            <Menu
                anchor={isValidElement(button) ?
                    cloneElement(button, {
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
                open={isOpen}
                onClose={handleClose}
                listProps={listProps}
                anchorOrigin="top right"
                transformOrigin="top right"
                {...menuProps}
            >
                {items.filter(item => !!item).map(item =>
                    <Menu.Item {...item} />
                )}
            </Menu>
        </div>
    );
}