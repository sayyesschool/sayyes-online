import { useCallback, useState } from 'react';
import {
    Card,
    IconButton
} from 'mdc-react';

import FormDialog from 'shared/components/form-dialog';

import UnitList from 'app/components/courses/unit-list';
import UnitForm from 'app/components/courses/unit-form';

export default function CourseUnits({ course, onCreate, onUpdate, onDelete }) {
    const [isFormOpen, setFormOpen] = useState(false);

    const handleAdd = useCallback(() => {
        setFormOpen(true);
    }, []);

    return (
        <section className="course-units">
            <Card>
                <Card.Header
                    title="Юниты"
                    actions={
                        <IconButton
                            icon="add"
                            onClick={handleAdd}
                        />
                    }
                />

                <Card.Section>
                    <UnitList
                        units={course.units}
                        onDelete={onDelete}
                    />
                </Card.Section>
            </Card>

            <FormDialog
                title="Новый юнит"
                form="unit-form"
                open={isFormOpen}
                fullScreen
                onClose={() => setFormOpen(false)}
            >
                <UnitForm
                    onSubmit={onCreate}
                />
            </FormDialog>
        </section>
    );
}