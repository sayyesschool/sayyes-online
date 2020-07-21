import React from 'react';
import {
    TopAppBar
} from 'mdc-react';

import './index.scss';

export default function AppHeader() {
    return (
        <TopAppBar
            id="app-header"
            title="Say Yes Online"
        />
    );
}