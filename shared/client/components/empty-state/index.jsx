import classnames from 'classnames';

import Icon from 'shared/ui-components/icon';
import Text from 'shared/ui-components/text';

import './index.scss';

export default function EmptyState({ icon, title, description, className, ...props }) {
    const classNames = classnames('empty-state', className);

    return (
        <div className={classNames} {...props}>
            {icon &&
                <Icon className="empty-state__icon">{icon}</Icon>
            }

            <Text as="h3" className="empty-state__title">{title}</Text>

            {description &&
                <Text as="p" className="empty-state__description">{description}</Text>
            }
        </div>
    );
}