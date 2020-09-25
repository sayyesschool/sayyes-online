import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Avatar,
    Icon,
    IconButton,
    TabBar, Tab,
    TopAppBar
} from 'mdc-react';

import './index.scss';

export default function AppHeader({ onNavigationIconClick }) {
    return (
        <TopAppBar id="app-header" fixed>
            <TopAppBar.Row>
                <TopAppBar.Section align="start">
                    <TopAppBar.Title>Say Yes Online</TopAppBar.Title>

                    <TabBar minWidth>
                        {links.map(link =>
                            <Tab
                                key={link.key}
                                component={NavLink}
                                to={link.url}
                                exact={link.exact}
                                activeClassName="mdc-tab--active"
                                icon={<Icon>{link.icon}</Icon>}
                                label={link.text}
                            />
                        )}
                    </TabBar>
                </TopAppBar.Section>

                <TopAppBar.Section align="end">
                    <TopAppBar.ActionItem>
                        <IconButton>
                            <Icon>notifications</Icon>
                        </IconButton>
                    </TopAppBar.ActionItem>

                    <TopAppBar.ActionItem>
                        <Avatar text="ОП" />
                    </TopAppBar.ActionItem>
                </TopAppBar.Section>
            </TopAppBar.Row>
        </TopAppBar>
    );
}

const links = [
    { key: 'home', url: '/', text: 'Главная', icon: 'home', exact: true },
    { key: 'class', url: '/class', text: 'Класс', icon: 'school', exact: false },
    { key: 'club', url: '/speaking-club', text: 'Разговорный клуб', icon: 'voice_chat', exact: false },
    { key: 'dictionary', url: '/dictionary', text: 'Словарь', icon: 'menu_book', exact: false }
];