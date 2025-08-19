import { StatusColor, StatusIcon } from 'shared/data/status';
import {
    Badge,
    Icon
} from 'shared/ui-components';

import styles from './StatusBadge.module.scss';

export default function StatusBadge({ status, children }) {
    return (
        <Badge
            className={styles.root}
            content={<Icon name={StatusIcon[status]} size="xs" />}
            size="sm"
            inset="10%"
            color={StatusColor[status]}
        >
            {children}
        </Badge>
    );
}