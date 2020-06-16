import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Icon,
    TopAppBar
} from 'mdc-react';

import './index.scss';

export default function Header() {
    return (
        <TopAppBar
            id="header"
            title={
                <Link to="/">
                    <img src="https://static.sayes.ru/images/logos/sayyes-speaking-club-white.png" />
                </Link>
            }
            actionItems={[
                <Button
                    element={Link}
                    to="/account"
                    leadingIcon={<Icon>person</Icon>}
                >
                    Мой аккаунт
                </Button>,
                <Button
                    element="a"
                    href="/logout"
                    leadingIcon={<Icon>exit_to_app</Icon>}
                >
                    Выйти
                </Button>
            ]}
            fixed
        />
    );
}