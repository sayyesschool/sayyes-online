import React from 'react';
import {
    Avatar,
    Icon,
    IconButton,
    TextField,
    TopAppBar
} from 'mdc-react';

import './index.scss';

export default function AppHeader({ onNavigationIconClick }) {
    return (
        <TopAppBar id="app-header">
            <TopAppBar.Row>
                <TopAppBar.Section align="start">
                    <TopAppBar.NavigationIcon
                        onClick={onNavigationIconClick}
                    >
                        <Icon>menu</Icon>
                    </TopAppBar.NavigationIcon>

                    <TopAppBar.Title>Say Yes Online</TopAppBar.Title>

                    {/* <TextField
                        filled
                    /> */}
                </TopAppBar.Section>

                <TopAppBar.Section align="end">
                    <TopAppBar.ActionItem>
                        <IconButton>
                            <Icon>notifications</Icon>
                        </IconButton>
                    </TopAppBar.ActionItem>

                    <TopAppBar.ActionItem>
                        <Avatar text="ОП" />
                    </TopAppBar.ActionItem>
                </TopAppBar.Section>
            </TopAppBar.Row>
        </TopAppBar>
    );
}