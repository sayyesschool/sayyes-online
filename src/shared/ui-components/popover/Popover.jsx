import { Popper } from '@mui/base/Popper';
import classnames from 'classnames';

export default function Popover({ className, ...props }) {
    return (
        <Popper
            className={classnames('ui-Popover', className)}
            {...props}
        />
    );
}