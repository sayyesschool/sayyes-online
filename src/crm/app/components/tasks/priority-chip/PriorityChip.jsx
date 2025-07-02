import StatusIcon from 'shared/components/status-icon';
import { PriorityColor, PriorityLabel } from 'shared/data/common';
import { Chip } from 'shared/ui-components';
import classnames from 'shared/utils/classnames';

// TODO: это копия компонента StatusChip, нужно сделать один компонент с параметром priority/status:
export default function PriorityChip({
    status,
    size,
    variant = 'soft',
    className,
    ...props
}) {
    const classNames = classnames('PriorityChip', {
        [`PriorityChip--${status}`]: status
    }, className);

    return (
        <Chip
            className={classNames}
            start={
                <StatusIcon status={status} />
            }
            content={PriorityLabel[status]}
            color={PriorityColor[status]}
            variant={variant}
            size={size}
            {...props}
        />
    );
}