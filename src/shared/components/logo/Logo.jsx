import { STATIC_URL } from 'shared/constants';

import styles from './Logo.module.scss';

export default function Logo({ variant = 'sayyes-english-school_purple' }) {
    return (
        <div className={styles.root}>
            <img
                src={`${STATIC_URL}/images/logos/${variant}.svg`}
                alt="Логотип Say Yes"
            />
        </div>
    );
}