import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Drawer,
    Icon,
    List, ListItem
} from 'mdc-react';

import './index.scss';

export default function AppDrawer({ open }) {
    return (
        <Drawer id="app-drawer" dismissible open={open} appear>
            <Drawer.Content>
                <List>
                    {links.map(link =>
                        <ListItem
                            key={link.key}
                            component={NavLink}
                            to={link.url}
                            exact={link.exact}
                            activeClassName="mdc-list-item--activated"
                            graphic={<Icon>{link.icon}</Icon>}
                            text={link.text}
                        />
                    )}
                </List>
            </Drawer.Content>
        </Drawer>
    );
}

const links = [
    { key: 'home', url: '/', text: 'Главная', icon: 'home', exact: true },
    { key: 'account', url: '/account', text: 'Личный кабинет', icon: 'person', exact: false },
    { key: 'lessons', url: '/lessons', text: 'Обучение', icon: 'school', exact: false },
    { key: 'club', url: '/speaking-club', text: 'Разговорный клуб', icon: 'voice_chat', exact: false },
    { key: 'dictionary', url: '/dictionary', text: 'Словарь', icon: 'menu_book', exact: false }
];