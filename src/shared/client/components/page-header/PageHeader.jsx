import classnames from 'classnames';
import { isValidElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Breadcrumbs, Button, Heading, IconButton, Link, Tabs, Text } from 'shared/ui-components';

export default function PageHeader({
    overline,
    title,
    description,
    breadcrumbs,
    tabs,
    actions,
    className,
    children
}) {
    const classNames = classnames('PageHeader', {
        'PageHeader--with-tabs': Boolean(tabs)
    }, className);

    return (
        <header className={classNames}>
            <div className="PageHeader__row">
                <div className="PageHeader__main">
                    {breadcrumbs?.length > 0 &&
                        <Breadcrumbs
                            className="PageHeader__breadcrumbs"
                            sx={{ padding: '0' }}
                        >
                            {breadcrumbs.map(props =>
                                props.to ?
                                    <Link key={props.to} component={RouterLink} {...props} /> :
                                    <Text {...props} />
                            )}
                        </Breadcrumbs>
                    }

                    {overline &&
                        <Text className="PageHeader__overline">{overline}</Text>
                    }

                    {title &&
                        <Heading
                            as="h1"
                            className="PageHeader__title"
                            type="h2"
                            content={title}
                        />
                    }

                    {description &&
                        <Text className="PageHeader__description" content={description} />
                    }
                </div>

                {tabs &&
                    <Tabs
                        className="PageHeader__tabs"
                        items={tabs}
                        variant="plain"
                        size="sm"
                        color="primary"

                    />
                }

                {actions &&
                    <div className="PageHeader__actions">
                        {actions?.filter(a => !!a).map(action => isValidElement(action) ? action : ((action.icon && !action.content) ?
                            <IconButton color="neutral" size="sm" variant="soft" {...action} /> :
                            <Button {...action} />
                        ))}
                    </div>
                }
            </div>

            {children &&
                <div className="PageHeader__row">
                    {children}
                </div>
            }
        </header>
    );
}