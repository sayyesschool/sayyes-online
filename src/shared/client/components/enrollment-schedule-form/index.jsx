import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';

import { useBoolean } from 'shared/hooks/state';
import { useFormData } from 'shared/hooks/form';
import { rescheduleLessons } from 'shared/libs/enrollment';
import { Form, FormCheckbox, FormInput } from 'shared/ui-components/form';
import LessonPillGroup from 'shared/components/lessons-pill-group';
import ScheduleSelect from 'shared/components/schedule-select';
import { Text } from 'shared/ui-components';

export default function EnrollmentScheduleForm({ enrollment, onSubmit, ...props }) {
    const [lessons, setLessons] = useState([]);
    const [shouldUpdateLessons, toggleShouldUpdateLessons] = useBoolean(false);

    const { data, handleChange } = useFormData({
        schedule: enrollment.schedule,
        startDate: enrollment.lessons.length > 0 ? new Date() : undefined
    });

    useEffect(() => {
        const lessons = rescheduleLessons({
            schedule: data.schedule,
            lessons: enrollment.lessons,
            startDate: typeof data.startDate === 'string' ? new Date(data.startDate) : data.startDate
        });

        setLessons(lessons);
    }, [data]);

    const handleSubmit = useCallback(() => {
        onSubmit(data);
    }, [data]);

    return (
        <Form className="EnrollmentScheduleForm" onSubmit={handleSubmit} {...props}>
            <ScheduleSelect
                name="schedule"
                schedule={data.schedule}
                onChange={handleChange}
            />

            {enrollment.lessons?.length > 0 &&
                <FormCheckbox
                    label="Обновить уроки"
                    checked={shouldUpdateLessons}
                    onChange={toggleShouldUpdateLessons}
                />
            }

            {shouldUpdateLessons &&
                <>
                    <FormInput
                        type="date"
                        name="startDate"
                        value={moment(data.startDate).format('YYYY-MM-DD')}
                        min={moment().format('YYYY-MM-DD')}
                        label="С даты"
                        filled
                        required
                        onChange={handleChange}
                    />

                    <Text>Старое расписание:</Text>

                    <LessonPillGroup
                        lessons={enrollment.lessons.filter(lesson => new Date(lesson.date) > new Date(data.startDate))}
                    />

                    <Text>Новое расписание:</Text>

                    <LessonPillGroup
                        lessons={lessons}
                    />
                </>
            }
        </Form>
    );
}