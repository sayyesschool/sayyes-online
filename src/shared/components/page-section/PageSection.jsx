import { isValidElement } from 'react';

import { Heading, Icon, IconButton, Surface, Text } from 'shared/ui-components';
import cn from 'shared/utils/classnames';

export default function PageSection({
    title,
    description,
    icon,
    actions,
    header,
    compact,
    plain,
    scrollable,

    children,
    className,
    ...props
}) {
    const classNames = cn(className, 'PageSection', {
        'PageSection--compact': compact,
        'PageSection--plain': plain,
        'PageSection--scrollable': scrollable
    });

    return (
        <Surface
            as="section"
            className={classNames}
            {...props}
        >
            <div className="PageSection__header">
                {icon &&
                    <Icon className="PageSection__header-icon">{icon}</Icon>
                }

                {(title || description) &&
                    <div className="PageSection__header-text">
                        <Heading
                            as="h3"
                            type="h4"
                            content={title}
                        />

                        {description &&
                            <Text type="body2" content={description} />
                        }
                    </div>
                }

                {header}

                {actions &&
                    <div className="PageSection__header-actions">
                        {Array.isArray(actions) ?
                            actions.filter(a => !!a).map(action =>
                                isValidElement(action) ?
                                    action :
                                    <IconButton
                                        key={action.key}
                                        size="sm"
                                        variant="plain"
                                        color="neutral"
                                        {...action}
                                    />
                            ) : actions
                        }
                    </div>
                }
            </div>

            <div className="PageSection__content">
                {children}
            </div>
        </Surface>
    );
}