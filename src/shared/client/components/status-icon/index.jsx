import classnames from 'classnames';

import { Icon } from 'shared/ui-components';

const StatusIconByType = {
    active: 'pending',
    new: 'fiber_new',
    processing: 'pending',
    completed: 'circle_check',
    succeeded: 'done',
    canceled: 'cancel',
    scheduled: 'schedule',
    ended: 'success'
};

export default function StatusIcon({ status, className, ...props }) {
    const classNames = classnames('StatusIcon', {
        [`StatusIcon--${status}`]: status
    }, className);

    return (
        <Icon
            className={classNames}
            name={StatusIconByType[status]}
            {...props}
        />
    );
}