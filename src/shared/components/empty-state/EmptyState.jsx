import { Icon, Text } from 'shared/ui-components';
import classnames from 'shared/utils/classnames';

export default function EmptyState({ icon, title, description, className, ...props }) {
    const classNames = classnames('EmptyState', className);

    return (
        <div className={classNames} {...props}>
            {icon &&
                <Icon className="EmptyState__icon">{icon}</Icon>
            }

            <Text as="h3" className="EmptyState__title">{title}</Text>

            {description &&
                <Text as="p" className="EmptyState__description">{description}</Text>
            }
        </div>
    );
}