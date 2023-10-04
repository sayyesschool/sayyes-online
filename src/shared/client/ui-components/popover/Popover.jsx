import classnames from 'classnames';

import { Popper } from '@mui/base/Popper';

export default function Popover({ className, ...props }) {
    return (
        <Popper
            className={classnames('ui-Popover', className)}
            {...props}
        />
    );
}