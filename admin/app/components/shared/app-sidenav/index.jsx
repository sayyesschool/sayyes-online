import React from 'react';
import { useHistory, useLocation, matchPath } from 'react-router-dom';
import { Nav } from '@fluentui/react';

import './index.scss';

const links = [
    { key: '/', url: '/', name: 'Главная', icon: 'Home', exact: true },
    { key: '/requests', url: '/requests', name: 'Заявки', icon: 'ContactCard', exact: false },
    { key: '/lessons', url: '/lessons', name: 'Уроки', icon: 'Event', exact: false },
    { key: '/payments', url: '/payments', name: 'Платежи', icon: 'PaymentCard', exact: false },
    {
        name: 'Люди', isExpanded: true, links: [
            { key: '/students', url: '/students', name: 'Студенты', icon: 'People', exact: false },
            { key: '/teachers', url: '/teachers', name: 'Преподаватели', icon: 'People', exact: false },
        ]
    },
];

export default function AppSidenav() {
    const history = useHistory();
    const location = useLocation();

    function handleLinkClick(event, link) {
        event.preventDefault();

        history.push(link.url);
    }

    const match = links.map(link => matchPath(location.pathname, { path: link.url, exact: link.exact })).find(match => match !== null);

    return (
        <aside id="app-sidenav">
            <Nav
                onLinkClick={handleLinkClick}
                selectedKey={match?.path}
                groups={[{
                    links
                }]}
                styles={{
                    link: {
                        paddingLeft: '1rem'
                    },
                    linkText: {
                        marginLeft: '1rem'
                    }
                }}
            />
        </aside>
    );
}