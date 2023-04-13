import classnames from 'classnames';

import { Alert, Notification } from 'shared/ui-components';

import './index.scss';

const ColorMap = {

};

export default function NotificationAlert({
    type,
    open,
    content,
    onClose,

    className,
    ...props
}) {
    console.log('TYPE', type);
    console.log('OPEN', open);
    const classNames = classnames('NotificationAlert', className);

    return (
        <Notification open={open} onClose={onClose}>
            <Alert
                className={classNames}
                content={content}
                color={ColorMap[type]}
                {...props}
            />
        </Notification>
    );
}

