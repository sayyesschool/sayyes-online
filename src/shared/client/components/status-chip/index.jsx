import classnames from 'classnames';

import { Chip } from 'shared/ui-components';
import StatusIcon from 'shared/components/status-icon';
import { StatusLabel, StatusColor } from 'shared/data/status';

export default function StatusChip({ status, className, ...props }) {
    const classNames = classnames('sy-StatusChip', {
        [`sy-StatusChip--${status}`]: status
    }, className);

    return (
        <Chip
            className={classNames}
            start={
                <StatusIcon status={status} />
            }
            content={StatusLabel[status]}
            color={StatusColor[status]}
            variant="soft"
            {...props}
        />
    );
}