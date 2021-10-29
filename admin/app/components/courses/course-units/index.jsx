import { useCallback, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import PageFAB from 'shared/components/page-fab';

import UnitList from 'app/components/courses/unit-list';
import UnitForm from 'app/components/courses/unit-form';

export default function CourseUnits({ course, onCreate, onUpdate, onDelete }) {
    const [isFormOpen, setFormOpen] = useState(false);

    const handleAdd = useCallback(() => {
        setFormOpen(true);
    }, []);

    return (
        <section className="course-units">
            <UnitList
                units={course.units}
                onDelete={onDelete}
            />

            <FormDialog
                title="Новый юнит"
                form="unit-form"
                open={isFormOpen}
                fullscreen
                onClose={() => setFormOpen(false)}
            >
                <UnitForm
                    onSubmit={onCreate}
                />
            </FormDialog>

            <PageFAB
                icon="add"
                onClick={handleAdd}
            />
        </section>
    );
}