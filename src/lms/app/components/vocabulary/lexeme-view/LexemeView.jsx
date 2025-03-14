import { Icon, Link } from 'shared/ui-components';

import styles from './LexemeView.module.scss';

export default function LexemeView({
    as: Component,
    inline,
    onClose,
    children,
    ...props
}) {
    return !inline && Component ? (
        <Component onClose={onClose} {...props}>
            {children}
        </Component>
    ) : (
        <div className={styles.root}>
            <Link
                as="button"
                start={<Icon name="chevron_left" size="s" />}
                content="Назад"
                type="body-sm"
                underline="none"
                onClick={onClose}
            />

            {children}
        </div>
    );
}