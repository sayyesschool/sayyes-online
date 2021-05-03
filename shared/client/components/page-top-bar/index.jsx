import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Icon,
    IconButton,
    TopAppBar
} from 'mdc-react';

import './index.scss';

export default function PageTopBar({ title, breadcrumbs, backTo, actions, children }) {
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
                            <div className="page-breadcrumbs">
                                {breadcrumbs.map((item, index) =>
                                    React.cloneElement(item, { key: index, className: 'mdc-typography--subtitle1' })
                                )}
                            </div>
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
                                {React.isValidElement(action) ?
                                    React.cloneElement(action) :
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