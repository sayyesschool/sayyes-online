import { useMemo, useState } from 'react';

import { RefEntity as EntityRef } from 'core/models/common/constants';

import PageSection from 'shared/components/page-section';
import { Surface } from 'shared/ui-components';

import Tasks from 'crm/components/tasks/tasks';

export default function TeacherTasks({ teacher }) {
    const [isFormOpen, setFormOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const entity = useMemo(() => ({
        id: teacher?.id,
        type: EntityRef.Teacher
    }), [teacher?.id]);

    const filters = useMemo(() => ({
        'refs.id': teacher?.id,
        completed: false
    }), [teacher?.id]);

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