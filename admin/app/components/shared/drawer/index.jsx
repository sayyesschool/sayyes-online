import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Drawer as MDCDrawer, DrawerContent,
    Icon,
    List, ListItem, ListItemGraphic, ListItemText
} from 'mdc-react';

import './index.scss';

export default function Drawer() {
    return (
        <MDCDrawer id="drawer">
            <DrawerContent>
                <List element="nav">
                    {[
                        { path: '/', text: 'Главная', icon: 'home', exact: true },
                        { path: '/lessons', text: 'Уроки', icon: 'event', exact: false },
                        { path: '/payments', text: 'Платежи', icon: 'payment', exact: false },
                        { path: '/users', text: 'Пользователи', icon: 'people', exact: false },
                    ].map(item =>
                        <ListItem key={item.path} element={NavLink} to={item.path} exact={item.exact} activeClassName="mdc-list-item--activated">
                            <ListItemGraphic>
                                <Icon>{item.icon}</Icon>
                            </ListItemGraphic>

                            <ListItemText>{item.text}</ListItemText>
                        </ListItem>
                    )}
                </List>
            </DrawerContent>
        </MDCDrawer>
    );
}