import { Header, Text, Toolbar } from '@fluentui/react-northstar';
import classnames from 'classnames';

import Breadcrumbs from 'shared/components/breadcrumbs';
import Icon from 'shared/components/icon';

import './index.scss';

export default function PageHeader({ overline, title, description, breadcrumbs, menu, actions, className, pullContent, withTabs, children }) {
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
                    </div>

                    {actions &&
                        <div className="page-header__section page-header__section--actions">
                            <Toolbar
                                items={actions.filter(action => Boolean(action)).map(action => ({
                                    ...action,
                                    icon: action.icon && <Icon name={action.icon} />
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