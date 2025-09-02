import { cloneElement, isValidElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import LoadingIndicator from 'shared/components/loading-indicator';
import { Breadcrumbs, Button, Heading, Icon, IconButton, Link, Tabs, Text } from 'shared/ui-components';
import classnames from 'shared/utils/classnames';

export default function PageHeader({
    overline,
    title,
    description,
    breadcrumbs,
    tabs,
    actions,
    start,
    center,
    end,
    loading,
    className,
    children
}) {
    const classNames = classnames('PageHeader', {
        'PageHeader--with-tabs': Boolean(tabs)
    }, className);

    const tabProps = Array.isArray(tabs) ? { items: tabs } : tabs;

    return (
        <header className={classNames}>
            <div className="PageHeader__row">
                {start &&
                    <div className="PageHeader__start">
                        {start}
                    </div>
                }

                <div className="PageHeader__main">
                    {breadcrumbs?.length > 0 &&
                        <Breadcrumbs
                            className="PageHeader__breadcrumbs"
                            separator={<Icon name="chevron_forward" />}
                            sx={{ padding: '0' }}
                        >
                            {breadcrumbs.map(props =>
                                props.to ?
                                    <Link
                                        key={props.to}
                                        component={RouterLink}
                                        {...props}
                                    />
                                    :
                                    <Text key={props.key} {...props} />
                            )}
                        </Breadcrumbs>
                    }

                    {overline &&
                        <Text
                            className="PageHeader__overline"
                            type="title-sm"
                            content={overline}
                        />
                    }

                    {title && (isValidElement(title) ?
                        cloneElement(title, {
                            as: 'h1',
                            className: classnames('PageHeader__title', title.props.className),
                            type: 'h2'
                        })
                        :
                        <Heading
                            as="h1"
                            className="PageHeader__title"
                            type="h2"
                            content={title}
                            end={loading && <LoadingIndicator size="sm" />}
                        />
                    )}

                    {description && (isValidElement(description) ?
                        cloneElement(description, {
                            className: classnames('PageHeader__description', description.props.className)
                        })
                        :
                        <Text
                            className="PageHeader__description"
                            color="neutral"
                            content={description}
                        />
                    )}
                </div>

                {tabs &&
                    <Tabs
                        className="PageHeader__tabs"
                        variant="plain"
                        size="sm"
                        color="primary"
                        disableIndicator
                        disableUnderline
                        {...tabProps}
                    />
                }

                {center &&
                    <div className="PageHeader__center">
                        {center}
                    </div>
                }

                {actions &&
                    <div className="PageHeader__actions">
                        {(Array.isArray(actions) ? actions : [actions])
                            .filter(a => !!a)
                            .map(action => isValidElement(action) ?
                                cloneElement(action, {
                                    ...action.props
                                }) :
                                (action.icon && !action.content) ?
                                    <IconButton
                                        {...action}
                                    /> :
                                    <Button {...action} />
                            )}
                    </div>
                }

                {end &&
                    <div className="PageHeader__end">
                        {end}
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