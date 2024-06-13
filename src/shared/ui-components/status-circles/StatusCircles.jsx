import React from 'react';

import classnames from 'shared/utils/classnames';

import styles from './StatusCircles.module.scss';

export default function StatusCircles({ status }) {
    const circles = Array.from({ length: 4 }, (_, index) => {
        const classNames = classnames(styles.circle, {
            [styles.filled]: index < status
        });

        return <span key={index} className={classNames} />;
    });

    return <div className={styles.root}>{circles}</div>;
}