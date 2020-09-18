import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Drawer,
    Icon,
    List, ListItem
} from 'mdc-react';

import { useStore } from 'app/store';

import './index.scss';

export default function AppSidenav({ open }) {
    const [requests] = useStore('requests.list');

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
                            meta={link.key === 'requests' && requests?.length > 0 && requests.length}
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
    { key: 'clients', url: '/clients', text: 'Клиенты', icon: 'people', exact: false },
    // { key: 'students', url: '/students', text: 'Студенты', icon: 'people', exact: false },
    // { key: 'teachers', url: '/teachers', text: 'Преподаватели', icon: 'people', exact: false }
];