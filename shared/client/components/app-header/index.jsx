import React from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Icon,
    IconButton,
    TopAppBar
} from 'mdc-react';

import './index.scss';

export default function AppHeader({
    user,
    navigationIcon,
    onNavigationIconClick,
    children,
    ...props
}) {
    return (
        <TopAppBar id="app-header" {...props}>
            <TopAppBar.Row>
                <TopAppBar.Section align="start">
                    {navigationIcon &&
                        <TopAppBar.NavigationIcon
                            onClick={onNavigationIconClick}
                        >
                            <Icon>{navigationIcon}</Icon>
                        </TopAppBar.NavigationIcon>
                    }

                    <TopAppBar.Title>Say Yes Online</TopAppBar.Title>
                </TopAppBar.Section>

                {children &&
                    <TopAppBar.Section align="center">
                        {children}
                    </TopAppBar.Section>
                }

                <TopAppBar.Section align="end">
                    <TopAppBar.ActionItem element={Link} to="/account">
                        <Avatar className="user-avatar" text={user.initials} />
                    </TopAppBar.ActionItem>
                </TopAppBar.Section>
            </TopAppBar.Row>
        </TopAppBar>
    );
}