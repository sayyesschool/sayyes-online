import { Link } from 'shared/ui-components';

import styles from './LexemeView.module.scss';

export default function LexemeView({
    as: Component,
    onClose,
    children,
    ...props
}) {
    return Component ? (
        <Component {...props}>
            {children}
        </Component>
    ) : (
        <div className={styles.root}>
            <Link
                as="button"
                content="Назад"
                type="body-sm"
                onClick={onClose}
            />

            {children}
        </div>
    );
}