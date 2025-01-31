import { forwardRef } from 'react';

import Sheet from '@mui/joy/Sheet';
import classnames from 'classnames';

import styles from './Surface.module.scss';

const Surface = forwardRef(({
    padding,
    radius = 'md',
    shadow,
    className,
    ...props
}, ref) => {
    const classNames = classnames(
        className,
        'ui-Surface',
        styles.root,
        padding && styles[`padding-${padding}`],
        radius && styles[`radius-${radius}`],
        shadow && styles[`shadow-${shadow}`]
    );

    return (
        <Sheet
            ref={ref}
            className={classNames}
            {...props}
        />
    );
});

Surface.displayName = 'Surface';

export default Surface;