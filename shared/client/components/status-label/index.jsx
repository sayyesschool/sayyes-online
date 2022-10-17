import classnames from 'classnames';

import { Label, Status } from 'shared/ui-components';

const StatusState = {
    new: 'warning',
    processing: 'info',
    completed: 'success',
    succeeded: 'success',
    canceled: 'error',
    scheduled: 'info',
    ended: 'success'
};

export default function StatusLabel({ status, className, ...props }) {
    const classNames = classnames('status-label', {
        [`status-label--${status}`]: status
    }, className);

    return (
        <Label
            className={classNames}
            icon={status && {
                className: 'status-label__status',
                styles: { width: '8px', height: '8px', margin: '0 4px 0 2px' },
                content:
                    <Status
                        state={StatusState[status]}
                        size="smallest"
                    />
            }}
            iconPosition="start"
            {...props}
        />
    );
}