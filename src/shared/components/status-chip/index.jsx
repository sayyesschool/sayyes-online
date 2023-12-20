import StatusIcon from 'shared/components/status-icon';
import { StatusLabel, StatusColor } from 'shared/data/status';
import { Chip } from 'shared/ui-components';
import classnames from 'shared/utils/classnames';

export default function StatusChip({
    status,
    size,
    variant = 'soft',
    className,
    ...props
}) {
    const classNames = classnames('StatusChip', {
        [`StatusChip--${status}`]: status
    }, className);

    return (
        <Chip
            className={classNames}
            start={
                <StatusIcon status={status} />
            }
            content={StatusLabel[status]}
            color={StatusColor[status]}
            variant={variant}
            size={size}
            {...props}
        />
    );
}