import React from 'react';

import { Icon } from 'shared/ui-components';
import cn from 'shared/utils/classnames';

import styles from './StatusCircles.module.scss';

export default function StatusCircles({ status }) {
    return (
        <div className={styles.root}>
            {Array.from({ length: 5 })
                .map((_, index) => index < status)
                .map((filled, index) =>
                    <Icon
                        key={index}
                        className={cn(styles.icon, filled && styles.filled)}
                        name="star"
                        size="xl"
                        filled={filled}
                    />
                )}
        </div>
    );
}