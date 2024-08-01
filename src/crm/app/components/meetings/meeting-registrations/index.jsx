import { useCallback, useContext, useState } from 'react';

import {
    Card,
    Icon,
    IconButton,
    List, ListGroup, ListGroupSubheader,
    ListItem, ListItemGraphic, ListItemMeta,
    ListItemText, TextField
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';

import UIContext from 'crm/contexts/ui';

export default function MeetingRegistrations({
    registrations,
    onAdd,
    onUpdate,
    onRemove
}) {
    const [query, setQuery] = useState('');
    const [isSearching, toggleSearching] = useBoolean(false);

    const hideSearch = useCallback(() => {
        setQuery('');
        setSearching(false);
    }, []);

    const handleChange = useCallback((event, value) => {
        setQuery(value);
    }, []);

    const filteredRegistrations = query ? registrations.filter(r => {
        const lcQuery = query.toLowerCase();

        return (
            r.registrant.email.toLowerCase().includes(lcQuery) ||
            r.registrant.firstname.toLowerCase().includes(lcQuery) ||
            r.registrant.lastname.toLowerCase().includes(lcQuery)
        );
    }) : registrations;
    const pending = filteredRegistrations.filter(r => r.status === 'pending');
    const approved = filteredRegistrations.filter(r => r.status === 'approved');
    const canceled = filteredRegistrations.filter(r => r.status === 'canceled');
    const denied = filteredRegistrations.filter(r => r.status === 'denied');

    const subtitle = registrations?.length === 0 ? 'Регистраций пока нет' : undefined;

    return (
        <Card>
            <Card.Header
                title="Регистрации"
                subtitle={subtitle}
                actions={[
                    <IconButton
                        key="search"
                        icon={isSearching ? 'search_off' : 'search'}
                        title={isSearching ? 'Отменить поиск' : 'Поиск'}
                        onClick={toggleSearching}
                    />,
                    <IconButton
                        key="add"
                        icon="add"
                        onClick={onAdd}
                    />
                ]}
            />

            <Card.Section>
                {isSearching &&
                    <Card.Section secondary>
                        <TextField
                            placeholder="Поиск"
                            value={query}
                            trailingIcon={query && <Icon onClick={hideSearch}>close</Icon>}
                            filled
                            onChange={handleChange}
                        />
                    </Card.Section>
                }

                <MeetingRegistrationListGroup
                    title="В ожидании"
                    registrations={pending}
                    onRegistrationUpdate={onUpdate}
                    onRegistrationRemove={onRemove}
                />

                <MeetingRegistrationListGroup
                    title="Подтвержденные"
                    registrations={approved}
                    onRegistrationUpdate={onUpdate}
                    onRegistrationRemove={onRemove}
                />

                <MeetingRegistrationListGroup
                    title="Отмененные"
                    registrations={canceled}
                    onRegistrationUpdate={onUpdate}
                    onRegistrationRemove={onRemove}
                />

                <MeetingRegistrationListGroup
                    title="Отклоненные"
                    registrations={denied}
                    onRegistrationUpdate={onUpdate}
                    onRegistrationRemove={onRemove}
                />
            </Card.Section>
        </Card>
    );
}

function MeetingRegistrationListGroup({
    title,
    registrations,
    onRegistrationUpdate,
    onRegistrationRemove
}) {
    const UI = useContext(UIContext);

    function handleCopyButtonClick(value) {
        navigator.clipboard.writeText(value);
        UI.showNotification('Ссылка скопирована');
    }

    return (
        <ListGroup>
            <ListGroupSubheader>{title} ({registrations.length})</ListGroupSubheader>

            <List>
                {registrations.map(registration =>
                    <ListItem key={registration.id}>
                        <ListItemGraphic>
                            {registration.ticket ?
                                <Icon title="Пользователь c билетом">local_activity</Icon>
                                :
                                <Icon title={registration.user ? 'Пользователь' : 'Гость'}>{registration.user ? 'person' : 'person_outline'}</Icon>
                            }
                        </ListItemGraphic>

                        <ListItemText
                            primary={`${registration.registrant.firstname} ${registration.registrant.lastname}`}
                            secondary={registration.registrant.email}
                        />

                        <ListItemMeta>
                            {registration.joinUrl &&
                                <IconButton
                                    title="Копировать ссылку для входа"
                                    onClick={() => handleCopyButtonClick(registration.joinUrl)}
                                >
                                    <Icon>link</Icon>
                                </IconButton>
                            }

                            {!registration.ticket &&
                                <>
                                    {(registration.status === 'pending' || registration.status === 'denied') &&
                                        <IconButton
                                            title="Подтвердить"
                                            onClick={() => onRegistrationUpdate(registration, 'approve')}
                                        >
                                            <Icon>done</Icon>
                                        </IconButton>
                                    }

                                    {(registration.status === 'pending' || registration.status === 'approved') &&
                                        <IconButton
                                            title="Отклонить"
                                            onClick={() => onRegistrationUpdate(registration, 'deny')}
                                        >
                                            <Icon>block</Icon>
                                        </IconButton>
                                    }

                                    {(registration.status === 'denied' || registration.status === 'canceled') &&
                                        <IconButton
                                            title="Удалить"
                                            onClick={() => onRegistrationRemove(registration)}
                                        >
                                            <Icon>delete</Icon>
                                        </IconButton>
                                    }
                                </>
                            }
                        </ListItemMeta>
                    </ListItem>
                )}
            </List>
        </ListGroup>
    );
}