import classnames from 'classnames';
import { isValidElement } from 'react';

import { Heading, Icon, IconButton, Surface, Text } from 'shared/ui-components';

export default function PageSection({
    title,
    description,
    icon,
    actions,
    header,
    compact,

    children,
    className,
    ...props
}) {
    const classNames = classnames('PageSection', {
        'PageSection--compact': compact
    }, className);

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
                        <Heading as="h3" content={title} />
                        {description &&
                            <Text content={description} />
                        }
                    </div>
                }

                {header}

                {actions &&
                    <div className="PageSection__header-actions">
                        {Array.isArray(actions) ?
                            actions.filter(a => !!a).map(action =>
                                isValidElement(action) ? action :
                                    <IconButton
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