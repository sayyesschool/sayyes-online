import { Popper } from '@mui/base/Popper';
import classnames from 'classnames';

import styles from './Popover.module.scss';

export default function Popover({ className, ...props }) {
    return (
        <Popper
            className={classnames(className, 'ui-Popover', styles.root)}
            {...props}
        />
    );
}