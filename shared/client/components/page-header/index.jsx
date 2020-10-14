import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Icon,
    IconButton,
    TopAppBar
} from 'mdc-react';

import './index.scss';

export default function PageHeader({ title, backTo, actions = [], children }) {
    return (
        <TopAppBar className="page-header">
            <TopAppBar.Row>
                <TopAppBar.Section align="start">
                    {backTo &&
                        <TopAppBar.NavigationIcon component={Link} to={backTo}>
                            <Icon>arrow_back</Icon>
                        </TopAppBar.NavigationIcon>
                    }

                    {title &&
                        <TopAppBar.Title className="page-title">{title}</TopAppBar.Title>
                    }
                </TopAppBar.Section>

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
            </TopAppBar.Row>
        </TopAppBar>
    );
}