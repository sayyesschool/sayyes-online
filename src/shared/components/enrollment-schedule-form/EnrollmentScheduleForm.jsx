import { useCallback, useEffect, useState } from 'react';

import LessonPillGroup from 'shared/components/lessons-pill-group';
import ScheduleSelect from 'shared/components/schedule-select';
import { useFormData } from 'shared/hooks/form';
import { useBoolean } from 'shared/hooks/state';
import datetime from 'shared/libs/datetime';
import { rescheduleLessons } from 'shared/libs/enrollment';
import { Checkbox, Form, FormInput } from 'shared/ui-components';
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
        <Form
            className="EnrollmentScheduleForm" onSubmit={handleSubmit}
            {...props}
        >
            <ScheduleSelect
                name="schedule"
                schedule={data.schedule}
                onChange={handleChange}
            />

            {enrollment.lessons?.length > 0 &&
                <Checkbox
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
                        value={datetime(data.startDate).format('YYYY-MM-DD')}
                        min={datetime().format('YYYY-MM-DD')}
                        label="С даты"
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