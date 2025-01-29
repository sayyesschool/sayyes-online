import { NavLink, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import Page from 'shared/components/page';

import Packs from 'crm/components/packs';
import Rooms from 'crm/components/rooms';

import './Settings.scss';

const tabs = [
    {
        key: 'rooms',
        url: '/settings/rooms',
        content: 'Аудитории'
    },
    {
        key: 'packs',
        url: '/settings/packs',
        content: 'Пакеты'
    }
];

export default function SettingsPage() {
    const match = useRouteMatch('/settings/:view');

    return (
        <Page className="SettingsPage">
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
                    <Redirect
                        from="/settings"
                        to="/settings/rooms"
                        exact
                    />

                    <Route
                        path="/settings/rooms"
                        component={Rooms}
                        exact
                    />

                    <Route
                        path="/settings/packs"
                        component={Packs}
                        exact
                    />
                </Switch>
            </Page.Content>
        </Page >
    );
}