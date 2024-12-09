import { forwardRef } from 'react';

import JoyChip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import classnames from 'classnames';

import Icon from '../icon';

const Chip = forwardRef(({
    content,
    icon,
    start,
    end,

    children = content,
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Chip', className);

    return (
        <JoyChip
            ref={ref}
            className={classNames}
            startDecorator={icon ? <Icon>{icon}</Icon> : start}
            endDecorator={end}
            {...props}
        >
            {children}
        </JoyChip>
    );
});

Chip.displayName = 'Chip';

Chip.Delete = ChipDelete;

export { ChipDelete };
export default Chip;