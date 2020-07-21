import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Drawer,
    Icon,
    List, ListItem
} from 'mdc-react';

import './index.scss';

export default function AppSidenav() {
    return (
        <Drawer id="app-drawer" dismissible open appear>
            <Drawer.Content>
                <List>
                    {links.map(link =>
                        <ListItem
                            key={link.key}
                            component={NavLink}
                            to={link.url}
                            graphic={<Icon>{link.icon}</Icon>}
                            text={link.text}
                            exact={link.exact}
                        />
                    )}
                </List>
            </Drawer.Content>
        </Drawer>
    );
}

const links = [
    { key: 'home', url: '/', text: 'Главная', icon: 'home', exact: true },
    { key: 'requests', url: '/requests', text: 'Заявки', icon: 'contact_phone', exact: false },
    { key: 'lessons', url: '/lessons', text: 'Уроки', icon: 'school', exact: false },
    { key: 'payments', url: '/payments', text: 'Платежи', icon: 'payments', exact: false },
    { key: 'clients', url: '/clients', text: 'Студенты', icon: 'people', exact: false },
    { key: 'students', url: '/students', text: 'Студенты', icon: 'people', exact: false },
    { key: 'teachers', url: '/teachers', text: 'Преподаватели', icon: 'people', exact: false }
];