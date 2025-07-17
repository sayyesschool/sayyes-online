import { useMemo, useState } from 'react';

import { RefEntity as EntityRef } from 'core/models/common/constants';

import PageSection from 'shared/components/page-section';
import { Surface } from 'shared/ui-components';

import Tasks from 'crm/components/tasks/tasks';

export default function LearnerTasks({ learner }) {
    const [isFormOpen, setFormOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const entity = useMemo(() => ({
        id: learner?.id,
        type: EntityRef.Learner
    }), [learner?.id]);

    const filters = useMemo(() => ({
        'refs.id': learner?.id,
        completed: false
    }), [learner?.id]);

    return (
        <PageSection
            title="Задачи"
            actions={[{
                key: 'add',
                icon: 'add',
                onClick: () => setFormOpen(true)
            }]}
        >
            <Surface variant="outlined">
                <Tasks
                    entity={entity}
                    filters={filters}
                    isFormOpen={isFormOpen}
                    setLoading={setLoading}
                    setFormOpen={setFormOpen}
                />
            </Surface>
        </PageSection>
    );
}