import { useCallback, useContext, useState } from 'react';

import {
    Card,
    IconButton,
    List, ListGroup, ListGroupSubheader,
    ListItem, ListItemGraphic, ListItemMeta,
    ListItemText, TextField
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';

import UIContext from 'crm/contexts/ui';

export default function MeetingRegistrations({
    registrations,
    onCreate,
    onDelete
}) {
    const [query, setQuery] = useState('');
    const [isFormOpen, setFormOpen] = useState(false);
    const [isSearching, setSearching] = useState(false);

    const handleSubmit = useCallback(data => {
        setFormOpen(false);
        onCreate(data);
    }, []);

    const toggleSearch = useCallback(() => {
        setSearching(isSearching => {
            if (isSearching) {
                setQuery('');

                return false;
            } else {
                return true;
            }
        });
    }, []);

    const subtitle = (registrations?.length === 0) ?? 'Регистраций пока нет';

    const filteredRegistrations = query ? registrations.filter(r => {
        const lcQuery = query.toLowerCase();

        return (
            r.registrant.email.toLowerCase().includes(lcQuery) ||
            r.registrant.firstname.toLowerCase().includes(lcQuery) ||
            r.registrant.lastname.toLowerCase().includes(lcQuery)
        );
    }) : registrations;

    return (
        <section className="meeting-registrations">
            <Card outlined>
                <Card.Header
                    title="Регистрации"
                    subtitle={subtitle}
                    actions={[
                        <IconButton
                            key="search"
                            icon={isSearching ? 'search_off' : 'search'}
                            onClick={toggleSearch}
                        />,
                        <IconButton
                            key="add"
                            icon="add"
                            onClick={() => setFormOpen(true)}
                        />
                    ]}
                />

                {isSearching &&
                    <Card.Section secondary>
                        <TextField
                            placeholder="Поиск"
                            value={query}
                            outlined
                            onChange={(event, value) => setQuery(value)}
                        />
                    </Card.Section>
                }

                <Card.Section>
                    <MeetingRegistrationsList
                        registrations={filteredRegistrations}
                        onDelete={onDelete}
                    />
                </Card.Section>
            </Card>

            <FormDialog
                title="Новая регистрация"
                open={isFormOpen}
                form="meeting-registration-form"
                onClose={() => setFormOpen(false)}
            >
                <MeetingRegistrationForm
                    onSubmit={handleSubmit}
                />
            </FormDialog>
        </section>
    );
}