import cn from 'shared/utils/classnames';

import styles from './MembershipRegistrationsCounter.module.scss';

export default function MembershipRegistrationsCounter({ membership }) {
    return (
        <div className={styles.root}>
            {Array(membership.limit).fill(0).map((_, index) =>
                <span
                    key={index}
                    className={cn(styles.indicator, {
                        [styles.active]: index < membership.registrationsCount
                    })}
                >
                    {index + 1}
                </span>
            )}
        </div>
    );
}