import React, { useCallback } from 'react';
import {
    Card,
    IconButton,
    List
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import FormDialog from 'shared/components/form-dialog';

import { useStore } from 'app/store';
import MenuButton from 'app/components/shared/menu-button';

export default function EnrollmentCourses({ enrollment, onAdd, onRemove }) {
    const [courses] = useStore('courses.list');
    const [isFormOpen, toggleFormOpen] = useBoolean(false);

    const handleSubmit = useCallback(course => {
        onAdd(course);
    }, []);

    const courseIds = enrollment.courses.map(course => course.id);
    const items = courses
        .filter(course => !courseIds.includes(course.id))
        .map(course => ({
            key: course.id,
            graphic: <img src={course.imageUrl} />,
            text: course.title
        }));

    return (
        <section className="enrollment-courses">
            <Card>
                <Card.Header
                    title="Курсы"
                    actions={
                        <MenuButton
                            icon="add"
                            disabled={items.length === 0}
                            items={items}
                        />
                    }
                />

                <Card.Section>
                    <List imageList>
                        {enrollment.courses.map(course =>
                            <List.Item
                                graphic={<img src={course.imageUrl} />}
                                text={course.title}
                                meta={
                                    <IconButton
                                        icon="remove"
                                        title="Убрать курс"
                                        onClick={() => onRemove(course)}
                                    />
                                }
                            />
                        )}
                    </List>
                </Card.Section>
            </Card>

            <FormDialog
                title="Выбор курса"
                form="course-select-form"
                open={isFormOpen}
                onClose={toggleFormOpen}
            >

            </FormDialog>
        </section>
    );
}