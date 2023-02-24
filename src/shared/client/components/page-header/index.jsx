import classnames from 'classnames';

import { Breadcrumbs, Header, Icon, Tabs, Text, Toolbar } from 'shared/ui-components';

import './index.scss';

export default function PageHeader({ overline, title, description, breadcrumbs, menu, tabs, actions, toolbar, className, pullContent, children }) {
    const classNames = classnames('page-header', {
        'page-header--pull-content': pullContent,
        'page-header--with-tabs': Boolean(tabs)
    }, className);

    return (
        <header className={classNames}>
            <div className="page-header__inner">
                <div className="page-header__row">
                    <div className="page-header__section page-header__section--main">
                        {breadcrumbs?.length > 0 &&
                            <Breadcrumbs
                                className="page-header__breadcrumbs"
                                items={breadcrumbs}
                            />
                        }

                        {overline &&
                            <Text className="page-header__overline">{overline}</Text>
                        }

                        {title &&
                            <Header
                                as="h1"
                                content={title}
                                description={description}
                            />
                        }

                        {menu}

                        {tabs &&
                            <Tabs
                                items={tabs}
                            />
                        }
                    </div>

                    {actions &&
                        <div className="page-header__section page-header__section--actions">
                            {actions}
                        </div>
                    }

                    {toolbar &&
                        <div className="page-header__section page-header__section--toolbar">
                            <Toolbar
                                items={toolbar.filter(item => Boolean(item)).map(item => ({
                                    ...item,
                                    icon: item.icon && <Icon name={item.icon} />
                                }))}
                            />
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