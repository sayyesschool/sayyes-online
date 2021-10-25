import { Link } from 'react-router-dom';
import {
    Icon,
    TopAppBar
} from 'mdc-react';

import NotificationMenu from 'shared/components/notification-menu';
import UserMenu from 'shared/components/user-menu';

import './index.scss';

export default function AppHeader({
    user,
    navigationIcon,
    onNavigationIconClick,
    children,
    ...props
}) {
    return (
        <TopAppBar className="app-header" fixed {...props}>
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
                    <TopAppBar.ActionItem>
                        <NotificationMenu />
                    </TopAppBar.ActionItem>

                    <TopAppBar.ActionItem>
                        <UserMenu
                            user={user}
                            items={[
                                { key: 'account', component: Link, to: '/account', text: 'Личный кабинет' },
                                { key: 'logout', element: 'a', href: '/logout', text: 'Выйти' }
                            ]}
                        />
                    </TopAppBar.ActionItem>
                </TopAppBar.Section>
            </TopAppBar.Row>
        </TopAppBar>
    );
}