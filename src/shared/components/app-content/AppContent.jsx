import cn from 'shared/utils/classnames';

import styles from './AppContent.module.scss';

export default function AppContent({ full, className, ...props }) {
    const classNames = cn(styles.root, full && styles.full);

    return (
        <div className={classNames} {...props} />
    );
}