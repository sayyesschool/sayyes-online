import { forwardRef } from 'react';

import JoySkeleton from '@mui/joy/Skeleton';
import classnames from 'classnames';

import styles from './Skeleton.module.scss';

const Skeleton = forwardRef(({
    radius = 'md',
    shadow,
    className,
    ...props
}, ref) => {
    const classNames = classnames(
        className,
        'ui-Skeleton',
        styles.root,
        radius && styles[`radius-${radius}`],
        shadow && styles[`shadow-${shadow}`]
    );

    return (
        <JoySkeleton
            ref={ref}
            className={classNames}
            {...props}
        />
    );
});

Skeleton.displayName = 'Skeleton';

export default Skeleton;