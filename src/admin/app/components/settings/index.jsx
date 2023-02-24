import { Switch, Route, NavLink, useRouteMatch } from 'react-router-dom';


import { Menu } from 'shared/ui-components';
import Page from 'shared/components/page';

import Packs from './packs';
import Rooms from './rooms';

import './index.scss';

const menuItems = [
    {
        key: 'packs',
        url: '/settings/packs',
        content: 'Пакеты'
    },
    {
        key: 'rooms',
        url: '/settings/rooms',
        content: 'Комнаты'
    }
];

export default function SettingsPage() {
    const match = useRouteMatch('/settings/:view');

    return (
        <Page id="settings-page">
            <Page.Header title="Настройки"
                menu={
                    <Menu
                        items={menuItems.map(item => ({
                            key: item.key,
                            as: NavLink,
                            to: item.url,
                            content: item.content,
                            active: match?.url === item.url
                        }))}
                        primary
                        underlined
                    />
                }
            />

            <Page.Content>
                <Switch>
                    <Route exact path="/settings/packs" component={Packs} />
                    <Route exact path="/settings/rooms" component={Rooms} />
                </Switch>
            </Page.Content>
        </Page >
    );
}