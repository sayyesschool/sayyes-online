import classnames from 'classnames';
import { Text } from '@fluentui/react-northstar';

import Icon from 'shared/components/icon';

import './index.scss';

export default function EmptyState({ icon, title, description, className, ...props }) {
    const classNames = classnames('empty-state', className);

    return (
        <div className={classNames} {...props}>
            {icon &&
                <Icon className="empty-state__icon">{icon}</Icon>
            }

            <Text className="empty-state__title">{title}</Text>

            {description &&
                <Text className="empty-state__description">{description}</Text>
            }
        </div>
    );
}