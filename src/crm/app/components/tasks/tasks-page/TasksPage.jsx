import { useState } from 'react';

import Page from 'shared/components/page';
import { defaultFilters } from 'shared/data/task';
import { useManagers } from 'shared/hooks/managers';
import { useUser } from 'shared/hooks/user';
import { stripEmptyValues } from 'shared/utils/object';

import Tasks from 'crm/components/tasks/tasks';
import TasksSearch from 'crm/components/tasks/tasks-search';

export default function TasksPage() {
    const [user] = useUser();
    const [managers] = useManagers();

    const [filters, setFilters] = useState(defaultFilters);
    const [filter, setFilter] = useState('own');
    const [isFormOpen, setFormOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);

    return (
        <Page id="tasks">
            <Page.Header
                title="Задачи"
                tabs={{
                    defaultValue: filter,
                    onChange: (event, value) => setFilter(value),
                    items: [
                        {
                            key: 'own',
                            value: 'own',
                            content: 'Личные'
                        },
                        {
                            key: 'assignedToMe',
                            value: 'assignedToMe',
                            content: 'Назначенные мне'
                        },
                        {
                            key: 'assignedByMe',
                            value: 'assignedByMe',
                            content: 'Назначенные мной'
                        }
                    ]
                }}
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
                    <Tasks
                        filters={stripEmptyValues(filters)}
                        filter={filter}
                        isFormOpen={isFormOpen}
                        setFormOpen={setFormOpen}
                        setLoading={setLoading}
                        showRefs
                    />
                </Page.Section>
            </Page.Content>
        </Page>
    );
}