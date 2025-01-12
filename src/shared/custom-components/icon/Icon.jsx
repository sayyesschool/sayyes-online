import cn from 'classnames';

import styles from './Icon.module.scss';

export default function Icon({
    name,
    size = 'medium',
    filled,

    children = name,
    className,
    ...props
}) {
    const classNames = cn(
        className,
        'icon',
        styles.root,
        styles[size],
        filled && styles.filled
    );

    return (
        <i className={classNames} {...props}>{children}</i>
    );
}