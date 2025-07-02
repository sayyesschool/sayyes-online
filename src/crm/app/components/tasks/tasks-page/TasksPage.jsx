import { useState } from 'react';

import Page from 'shared/components/page';
import { useManagers } from 'shared/hooks/managers';
import { useUser } from 'shared/hooks/user';
import { stripEmptyValues } from 'shared/utils/object';

import TasksContent from 'crm/components/tasks/tasks-content';
import TasksSearch from 'crm/components/tasks/tasks-search';

const defaultFilters = {
    theme: '',
    priority: '',
    completed: '',
    performer: ''
};

export default function TasksPage() {
    const [user] = useUser();
    const [managers] = useManagers();
    const [filters, setFilters] = useState(defaultFilters);
    const [isFormOpen, setFormOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);

    return (
        <Page id="payments">
            <Page.Header
                title="Мои задачи"
                actions={[
                    {
                        key: 'add',
                        icon: 'add',
                        content: 'Создать задачу',
                        color: 'primary',
                        variant: 'solid',
                        onClick: () => setFormOpen(true)
                    }
                ]}
                loading={isLoading}
            >
                <TasksSearch
                    filters={filters}
                    user={user}
                    managers={managers}
                    defaultFilters={defaultFilters}
                    setFilters={setFilters}
                />
            </Page.Header>

            <Page.Content>
                <Page.Section variant="outlined" compact>
                    <TasksContent
                        user={user}
                        filters={stripEmptyValues(filters)}
                        managers={managers}
                        isFormOpen={isFormOpen}
                        setFormOpen={setFormOpen}
                        setLoading={setLoading}
                    />
                </Page.Section>
            </Page.Content>
        </Page>
    );
}