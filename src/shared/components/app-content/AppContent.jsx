import classnames from 'shared/utils/classnames';

import styles from './AppContent.module.scss';

export default function AppContent({ className, ...props }) {
    const classNames = classnames(className, styles.root);

    return (
        <div className={classNames} {...props} />
    );
}