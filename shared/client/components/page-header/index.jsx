import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Icon,
    IconButton,
    TopAppBar
} from 'mdc-react';

import './index.scss';

export default function PageHeader({ title, breadcrumbs, backTo, actions, children }) {
    return (
        <TopAppBar className="page-header">
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
                        {actions.filter(action => Boolean(action)).map(({ icon, ...props }, index) =>
                            <TopAppBar.ActionItem key={index}>
                                {props.label ?
                                    <Button
                                        icon={icon && <Icon>{icon}</Icon>}
                                        {...props}
                                    />
                                    :
                                    <IconButton
                                        icon={<Icon>{icon}</Icon>}
                                        {...props}
                                    />
                                }
                            </TopAppBar.ActionItem>
                        )}
                    </TopAppBar.Section>
                }
            </TopAppBar.Row>
        </TopAppBar>
    );
}