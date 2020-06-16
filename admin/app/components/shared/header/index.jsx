import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    TopAppBar
} from 'mdc-react';

import './index.scss';

export default function Header() {
    return (
        <TopAppBar
            id="header"
            title="Разговорный клуб"
            actionItems={[
                <Button element="a" href="/logout">Выйти</Button>
            ]}
            fixed
        />
    );
}