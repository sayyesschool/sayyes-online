import { NavLink, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import Page from 'shared/components/page';

import Packs from 'crm/components/packs';
import { RequestsSettings } from 'crm/components/requests';
import Rooms from 'crm/components/rooms';

const routes = [
    {
        key: 'rooms',
        url: '/settings/rooms',
        content: 'Аудитории',
        component: Rooms
    },
    {
        key: 'requests',
        url: '/settings/requests',
        content: 'Заявки',
        component: RequestsSettings
    },
    {
        key: 'packs',
        url: '/settings/packs',
        content: 'Пакеты',
        component: Packs
    }
];

export default function SettingsPage() {
    const match = useRouteMatch('/settings/:view');

    return (
        <Page className="SettingsPage">
            <Page.Header
                title="Настройки"
                tabs={{
                    defaultValue: match?.url,
                    items: routes.map(route => ({
                        key: route.key,
                        as: NavLink,
                        to: route.url,
                        content: route.content,
                        value: route.url
                    }))
                }}
            />

            <Page.Content>
                <Switch>
                    <Redirect
                        from="/settings"
                        to={routes[0].url}
                        exact
                    />

                    {routes.map(tab => (
                        <Route
                            key={tab.key}
                            path={tab.url}
                            component={tab.component}
                            exact
                        />
                    ))}
                </Switch>
            </Page.Content>
        </Page >
    );
}