import classnames from 'classnames';

import { Chip } from 'shared/ui-components';
import StatusIcon from 'shared/components/status-icon';

const StatusColor = {
    new: 'primary',
    processing: 'warning',
    postponed: 'neutral',
    completed: 'success',
    canceled: 'danger',
    succeeded: 'success'
};

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
            color={StatusColor[status]}
            variant="soft"
            {...props}
        />
    );
}