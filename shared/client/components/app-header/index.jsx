import { Link } from 'react-router-dom';
import {
    Flex,
    Header
} from '@fluentui/react-northstar';

// import NotificationMenu from 'shared/components/notification-menu';
import UserMenu from 'shared/components/user-menu';

import './index.scss';

export default function AppHeader({
    user,
    children,
    ...props
}) {
    return (
        <header className="app-header" {...props}>
            <Flex className="app-header__row" vAlign="center">
                <Flex as="section" className="app-header__section" hAlign="start">
                    <Link to="/">
                        <Header content="Say Yes Online" styles={{ margin: 0 }} color="white" />
                    </Link>
                </Flex>

                <Flex as="section" className="app-header__section" gap="gap.medium" hAlign="end" vAlign="center">
                    <UserMenu
                        user={user}
                        items={[
                            {
                                as: Link,
                                to: '/account',
                                content: 'Личный кабинет'
                            },
                            {
                                as: 'a',
                                href: '/logout',
                                content: 'Выйти'
                            }
                        ]}
                    />
                </Flex>
            </Flex>
        </header>
    );
}