import { cloneElement, isValidElement } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Icon,
    IconButton,
    TopAppBar,
    Typography
} from 'mdc-react';

import Breadcrumbs from 'shared/components/breadcrumbs';

import './index.scss';

export default function PageTopBar({ title, overline, breadcrumbs, backTo, actions, children }) {
    return (
        <TopAppBar className="page-top-bar">
            <TopAppBar.Row>
                <TopAppBar.Section align="start">
                    {backTo &&
                        <TopAppBar.NavigationIcon component={Link} to={backTo}>
                            <Icon>arrow_back</Icon>
                        </TopAppBar.NavigationIcon>
                    }

                    <div>
                        {breadcrumbs?.length > 0 &&
                            <Breadcrumbs
                                items={breadcrumbs}
                            />
                        }

                        {overline &&
                            <Typography type="overline" noMargin>{overline}</Typography>
                        }

                        {title &&
                            <TopAppBar.Title element="h1" className="page-title">{title}</TopAppBar.Title>
                        }
                    </div>
                </TopAppBar.Section>

                {children &&
                    <TopAppBar.Section>
                        {children}
                    </TopAppBar.Section>
                }

                {actions &&
                    <TopAppBar.Section align="end">
                        {actions.filter(action => Boolean(action)).map((action, index) =>
                            <TopAppBar.ActionItem key={index}>
                                {isValidElement(action) ?
                                    cloneElement(action) :
                                    (action.label ?
                                        <Button
                                            {...action}
                                            icon={action.icon && <Icon>{action.icon}</Icon>}
                                        />
                                        :
                                        <IconButton
                                            {...action}
                                            icon={<Icon>{action.icon}</Icon>}
                                        />
                                    )
                                }
                            </TopAppBar.ActionItem>
                        )}
                    </TopAppBar.Section>
                }
            </TopAppBar.Row>
        </TopAppBar>
    );
}