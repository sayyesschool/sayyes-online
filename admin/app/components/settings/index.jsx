import { Switch, Route, NavLink, useRouteMatch } from 'react-router-dom';

import { Menu } from '@fluentui/react-northstar';

import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import Packs from 'app/components/packs';
import Rooms from 'app/components/rooms';

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
            <PageHeader title="Настройки"
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

            <PageContent>
                <Switch>
                    <Route exact path="/settings/packs" component={Packs} />
                    <Route exact path="/settings/rooms" component={Rooms} />
                </Switch>
            </PageContent>
        </Page >
    );
}