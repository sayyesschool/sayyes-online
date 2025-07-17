import { useMemo, useState } from 'react';

import { RefEntity as EntityRef } from 'core/models/common/constants';

import PageSection from 'shared/components/page-section';
import { Surface } from 'shared/ui-components';

import Tasks from 'crm/components/tasks/tasks';

export default function EnrollmentTasks({ enrollment }) {
    const [isFormOpen, setFormOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const entity = useMemo(() => ({
        id: enrollment?.id,
        type: EntityRef.Enrollment
    }), [enrollment?.id]);

    const filters = useMemo(() => ({
        'refs.id': enrollment?.id,
        completed: false
    }), [enrollment?.id]);

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