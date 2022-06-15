import { useCallback, useEffect, useState } from 'react';
import {
    Checkbox,
    Input,
    Text
} from '@fluentui/react-northstar';
import moment from 'moment';

import { useBoolean } from 'shared/hooks/state';
import { rescheduleLessons } from 'shared/libs/enrollment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import LessonPillGroup from 'shared/components/lessons-pill-group';
import ScheduleSelect from 'shared/components/schedule-select';

import './index.scss';

export default function EnrollmentScheduleForm({ enrollment, onSubmit, ...props }) {
    const [lessons, setLessons] = useState([]);
    const [shouldUpdateLessons, toggleShouldUpdateLessons] = useBoolean(false);

    const { data, handleChange } = useForm({
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
        <Form className="enrollment-schedule-form" onSubmit={handleSubmit} {...props}>
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
                    <Input
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