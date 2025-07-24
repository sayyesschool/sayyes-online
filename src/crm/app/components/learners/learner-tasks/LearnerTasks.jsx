import { useMemo, useState } from 'react';

import { RefEntity as EntityRef } from 'core/models/common/constants';

import PageSection from 'shared/components/page-section';

import Tasks from 'crm/components/tasks/tasks';

export default function LearnerTasks({ learner }) {
    const [isFormOpen, setFormOpen] = useState(false);

    const entity = useMemo(() => ({
        id: learner?.id,
        type: EntityRef.Learner
    }), [learner?.id]);

    return (
        <PageSection
            title="Задачи"
            actions={[{
                key: 'add',
                icon: 'add',
                onClick: () => setFormOpen(true)
            }]}
            compact
        >
            <Tasks
                entity={entity}
                isFormOpen={isFormOpen}
                setFormOpen={setFormOpen}
            />
        </PageSection>
    );
}