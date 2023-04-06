import classnames from 'classnames';

import { Icon } from 'shared/ui-components';
import { StatusIcon as StatusIconMap } from 'shared/data/status';

export default function StatusIcon({ status, className, ...props }) {
    const classNames = classnames('StatusIcon', {
        [`StatusIcon--${status}`]: status
    }, className);

    return (
        <Icon
            className={classNames}
            name={StatusIconMap[status]}
            {...props}
        />
    );
}