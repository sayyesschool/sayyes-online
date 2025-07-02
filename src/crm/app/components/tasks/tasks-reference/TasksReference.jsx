import { useState } from 'react';

import PageSection from 'shared/components/page-section';
import { Surface } from 'shared/ui-components';

import TasksContent from 'crm/components/tasks/tasks-content';

export default function TasksReference({ user, taskRef, managers }) {
    const [isFormOpen, setFormOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);

    return (
        <PageSection
            title="Связь с задачами"
            actions={[
                {
                    key: 'add',
                    icon: 'add',
                    onClick: () => setFormOpen(true)
                }
            ]}
        >
            <Surface variant="outlined">
                <TasksContent
                    user={user}
                    taskRef={taskRef}
                    filters={{ 'refs.id': taskRef?.id, completed: false }}
                    managers={managers}
                    isFormOpen={isFormOpen}
                    setLoading={setLoading}
                    setFormOpen={setFormOpen}
                />
            </Surface>
        </PageSection>
    );
}