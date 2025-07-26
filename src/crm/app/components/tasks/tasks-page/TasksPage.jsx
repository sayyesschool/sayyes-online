import { useState } from 'react';

import Page from 'shared/components/page';
import { useManagers } from 'shared/hooks/managers';
import { useUser } from 'shared/hooks/user';
import { Chip, Flex } from 'shared/ui-components';

import Tasks from 'crm/components/tasks/tasks';
import TasksSearch from 'crm/components/tasks/tasks-search';

import styles from './TasksPage.module.scss';

export default function TasksPage() {
    const [user] = useUser();
    const [managers] = useManagers();

    const [query, setQuery] = useState();
    const [filter, setFilter] = useState();
    const [isFormOpen, setFormOpen] = useState(false);

    const handleChipClick = event => {
        const value = event.target.value;

        setFilter(filter => filter === value ? undefined : value);
    };

    return (
        <Page id="tasks">
            <Page.Header
                title="Задачи"
                center={
                    <Flex gap="xs">
                        <Chip
                            content="Личные"
                            slotProps={{
                                action: {
                                    value: 'own'
                                }
                            }}
                            color={filter === 'own' ? 'primary' : undefined}
                            variant={filter === 'own' ? 'soft' : 'outlined'}
                            onClick={handleChipClick}
                        />

                        <Chip
                            content="Назначенные мне"
                            slotProps={{
                                action: {
                                    value: 'assignedToMe'
                                }
                            }}
                            color={filter === 'assignedToMe' ? 'primary' : undefined}
                            variant={filter === 'assignedToMe' ? 'soft' : 'outlined'}
                            onClick={handleChipClick}
                        />

                        <Chip
                            content="Назначенные мной"
                            slotProps={{
                                action: {
                                    value: 'assignedByMe'
                                }
                            }}
                            color={filter === 'assignedByMe' ? 'primary' : undefined}
                            variant={filter === 'assignedByMe' ? 'soft' : 'outlined'}
                            onClick={handleChipClick}
                        />
                    </Flex>
                }
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
            >
                <TasksSearch
                    user={user}
                    managers={managers}
                    onParamsChange={setQuery}
                />
            </Page.Header>

            <Page.Content>
                <Page.Section variant="outlined" compact>
                    <Tasks
                        query={query}
                        filter={filter}
                        isFormOpen={isFormOpen}
                        setFormOpen={setFormOpen}
                        showRefs
                    />
                </Page.Section>
            </Page.Content>
        </Page>
    );
}