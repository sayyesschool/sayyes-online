import { useCallback, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import Page from 'shared/components/page';
import { IconButton, Input } from 'shared/ui-components';

import MeetingRegistrationForm from 'crm/components/meetings/meeting-registration-form';
import MeetingRegistrationsList from 'crm/components/meetings/meeting-registrations-list';

export default function MeetingRegistrations({
    meeting,
    onCreate,
    onUpdate,
    onDelete
}) {
    const [query, setQuery] = useState('');
    const [isFormOpen, setFormOpen] = useState(false);
    const [isSearching, setSearching] = useState(false);

    const handleSubmit = useCallback(data => {
        onCreate(data)?.finally(() => setFormOpen(false));
    }, [onCreate]);

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

    const registrations = meeting?.registrations;
    const hasRegistrations = registrations?.length > 0;

    const filteredRegistrations = query ? registrations.filter(r => {
        const lcQuery = query.toLowerCase();

        return (
            r.registrant.email.toLowerCase().includes(lcQuery) ||
            r.registrant.firstname.toLowerCase().includes(lcQuery) ||
            r.registrant.lastname.toLowerCase().includes(lcQuery)
        );
    }) : registrations;

    return (
        <Page.Section
            title="Регистрации"
            actions={[
                hasRegistrations &&
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
        >
            {isSearching &&
                <Input
                    placeholder="Поиск"
                    value={query}
                    onChange={(event, value) => setQuery(value)}
                />
            }

            {filteredRegistrations?.length > 0 &&
                <MeetingRegistrationsList
                    meeting={meeting}
                    registrations={filteredRegistrations}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            }

            <FormDialog
                title="Новая регистрация"
                submitButtonText="Создать"
                open={isFormOpen}
                onClose={() => setFormOpen(false)}
            >
                <MeetingRegistrationForm
                    id="meeting-registration-form"
                    onSubmit={handleSubmit}
                />
            </FormDialog>
        </Page.Section>
    );
}