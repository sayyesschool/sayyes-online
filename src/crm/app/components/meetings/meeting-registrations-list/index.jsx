import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
    Icon,
    IconButton,
    List, ListItem
} from 'mdc-react';

import UIContext from 'app/contexts/ui';

export default function MeetingRegistrationsList({ registrations, onDelete }) {
    const UI = useContext(UIContext);

    function handleCopyButtonClick(value) {
        navigator.clipboard.writeText(value);
        UI.showNotification('Ссылка скопирована');
    }

    return (
        <List twoLine>
            {registrations?.map(registration =>
                <ListItem key={registration.id}>
                    <ListItem.Graphic>
                        {<Icon>{getRegistrationIcon(registration)}</Icon>}
                    </ListItem.Graphic>

                    <ListItem.Text
                        element={Link}
                        to={registration.user.url}
                        primary={`${registration.registrant.firstname} ${registration.registrant.lastname}`}
                        secondary={registration.registrant.email}
                    />

                    <ListItem.Meta>
                        {registration.joinUrl &&
                            <IconButton
                                title="Копировать ссылку для входа"
                                icon="link"
                                onClick={() => handleCopyButtonClick(registration.joinUrl)}
                            />
                        }

                        <IconButton
                            title="Удалить"
                            icon="delete"
                            onClick={() => onDelete(registration)}
                        />
                    </ListItem.Meta>
                </ListItem>
            )}
        </List>
    );
}

function getRegistrationIcon(registration) {
    if (registration.status === 'canceled') return 'cancel';
    else if (registration.participated) return 'check_circle';
    else return 'radio_button_unchecked';
}