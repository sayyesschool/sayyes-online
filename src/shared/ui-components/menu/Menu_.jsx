import { forwardRef, useCallback } from 'react';
import classnames from 'classnames';

import JoyMenu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListDivider from '@mui/joy/ListDivider';

const Menu = forwardRef(({
  anchorElement,
  items,
  onItemClick = Function.prototype,
  onClose = Function.prototype,

  ...props
}, ref) => {
  const handleItemClick = useCallback((event, item) => {
    onItemClick(item);

    if (typeof item?.onClick === 'function') {
      item.onClick(event);
    }

    onClose();
  }, [onClose, onItemClick]);

  const classNames = classnames('ui-Menu');

  return (
    <JoyMenu
      ref={ref}
      className={classNames}
      anchorEl={anchorElement}
      onClose={onClose}
      {...props}
    >
      {items?.map(item =>
        item.kind === 'divider' ?
          <ListDivider key={item.key} />
          :
          <MenuItem
            key={item.key}
            {...item}
            onClick={event => handleItemClick(event, item)}
          >
            {item.content}
          </MenuItem>
      )}
    </JoyMenu>
  );
});

export default Menu;