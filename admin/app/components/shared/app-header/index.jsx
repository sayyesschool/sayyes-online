import React from 'react';
import {
    SearchBox,
    Persona, PersonaSize, PersonaPresence,
    Text
} from '@fluentui/react';

import './index.scss';

export default function AppHeader() {
    return (
        <header id="app-header">
            <Text className="app-title" variant="xLarge" nowrap>Say Yes Online</Text>

            <SearchBox
                className="app-search-box"
                placeholder="Поиск"
                styles={{
                    root: { width: '256px' }
                }}
                onSearch={newValue => console.log('value is ' + newValue)}
            />

            <Persona
                className="app-user-avatar"
                text="Олег Поляков"
                size={PersonaSize.small}
                hidePersonaDetails={true}
                presence={PersonaPresence.online}
            />
        </header>
    );
}