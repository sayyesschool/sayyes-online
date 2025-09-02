import { useCallback } from 'react';

import LessonPillGroup from 'shared/components/lessons-pill-group';
import ScheduleSelect from 'shared/components/schedule-select';
import { useFormData } from 'shared/hooks/form';
import { useBoolean } from 'shared/hooks/state';
import datetime from 'shared/libs/datetime';
import { rescheduleLessons } from 'shared/libs/enrollment';
import { Button, Checkbox, Form, FormInput } from 'shared/ui-components';
import { Text } from 'shared/ui-components';

export default function EnrollmentScheduleForm({ enrollment, onSubmit, ...props }) {
    const [shouldUpdateLessons, toggleShouldUpdateLessons] = useBoolean(false);

    const { data, setData, handleChange } = useFormData({
        schedule: enrollment.schedule,
        startDate: enrollment.lessons.length > 0 ? new Date() : undefined
    });

    const handleSubmit = useCallback(() => {
        return onSubmit(data);
    }, [data, onSubmit]);

    const handleAdd = useCallback(() => {
        setData(data => ({
            ...data,
            schedule: data.schedule.concat({ day: 0, from: '00:00', to: '00:00' })
        }));
    }, [setData]);

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

            <Button
                type="button"
                icon="add"
                variant="plain"
                content="Добавить"
                onClick={handleAdd}
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
                        lessons={rescheduleLessons({
                            lessons: enrollment.lessons,
                            schedule: data.schedule,
                            startDate: typeof data.startDate === 'string' ? new Date(data.startDate) : data.startDate
                        })}
                    />
                </>
            }
        </Form>
    );
}