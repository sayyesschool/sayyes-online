import React from 'react';
import {
    Button,
    Icon,
    IconButton,
    Typography
} from 'mdc-react';
import classnames from 'classnames';

import Breadcrumbs from 'shared/components/breadcrumbs';

import './index.scss';

export default function PageHeader({ title, subtitle, overline, graphic, breadcrumbs, actions, className, pullContent, withTabs, children }) {
    const classNames = classnames('page-header', {
        'page-header--pull-content': pullContent,
        'page-header--with-tabs': withTabs
    }, className);

    return (
        <header className={classNames}>
            <div className="page-header__inner">
                <div className="page-header__row">
                    <div className="page-header__section page-header__section--main">
                        {breadcrumbs?.length > 0 &&
                            <Breadcrumbs items={breadcrumbs} />
                        }

                        {overline && (React.isValidElement(overline) ?
                            React.cloneElement(overline, { className: 'page-header__overline' })
                            :
                            <Typography element="div" className="page-header__overline" type="overline">{overline}</Typography>
                        )}

                        {graphic &&
                            React.cloneElement(graphic, { className: 'page-header__graphic' })
                        }

                        {title && (React.isValidElement(title) ?
                            React.cloneElement(title, { className: 'page-header__title' })
                            :
                            <Typography className="page-header__title" type="headline4" noMargin>{title}</Typography>
                        )}

                        {subtitle && (React.isValidElement(subtitle) ?
                            React.cloneElement(subtitle, { className: 'page-header__subtitle' })
                            :
                            <Typography className="page-header__subtitle" type="headline6" noMargin>{subtitle}</Typography>
                        )}
                    </div>

                    {actions &&
                        <div className="page-header__section page-header__section--actions">
                            {actions.filter(action => Boolean(action)).map(action =>
                                React.isValidElement(action) ?
                                    React.cloneElement(action) :
                                    (action.label ?
                                        <Button
                                            key={action.key}
                                            icon={action.icon && <Icon>{action.icon}</Icon>}
                                            {...action}
                                        />
                                        :
                                        <IconButton
                                            key={action.key}
                                            icon={<Icon>{action.icon}</Icon>}
                                            {...action}
                                        />
                                    )
                            )}
                        </div>
                    }
                </div>

                {children &&
                    <div className="page-header__row">
                        {children}
                    </div>
                }
            </div>
        </header>
    );
}