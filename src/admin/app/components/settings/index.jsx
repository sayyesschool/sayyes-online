import { Switch, Route, NavLink, useRouteMatch } from 'react-router-dom';

import Page from 'shared/components/page';

import Packs from './packs';
import Rooms from './rooms';

import './index.scss';

const tabs = [
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
        <Page className="sy-SettingsPage">
            <Page.Header
                title="Настройки"
                tabs={tabs.map(tab => ({
                    key: tab.key,
                    as: NavLink,
                    to: tab.url,
                    content: tab.content,
                    active: match?.url === tab.url
                }))}
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