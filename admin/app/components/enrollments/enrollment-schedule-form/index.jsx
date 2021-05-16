import React, { useState, useCallback, useEffect } from 'react';
import {
    Checkbox,
    ChipSet, Chip,
    FormField,
    Layout,
    TextField,
    Typography
} from 'mdc-react';
import moment from 'moment';

import { useBoolean } from 'shared/hooks/state';
import { rescheduleLessons } from 'shared/utils/enrollment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import ScheduleSelect from 'shared/components/schedule-select';

import LessonChipSet from 'app/components/lessons/lesson-chip-set';

import './index.scss';

export default function EnrollmentScheduleForm({ enrollment, onSubmit, ...props }) {
    const [lessons, setLessons] = useState([]);
    const [shouldUpdateLessons, toggleShouldUpdateLessons] = useBoolean(false);

    const [data, handleChange] = useForm({
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
            <Layout column>
                <ScheduleSelect
                    name="schedule"
                    schedule={data.schedule}
                    onChange={handleChange}
                />

                {enrollment.lessons?.length > 0 &&
                    <FormField label="Обновить уроки">
                        <Checkbox
                            checked={shouldUpdateLessons}
                            onChange={toggleShouldUpdateLessons}
                        />
                    </FormField>
                }

                {shouldUpdateLessons &&
                    <>
                        <TextField
                            type="date"
                            name="startDate"
                            value={moment(data.startDate).format('YYYY-MM-DD')}
                            min={moment().format('YYYY-MM-DD')}
                            label="С даты"
                            filled
                            required
                            onChange={handleChange}
                        />

                        <Typography type="subtitle2">Старое расписание</Typography>

                        <LessonChipSet
                            lessons={enrollment.lessons.filter(lesson => new Date(lesson.date) > new Date(data.startDate))}
                        />

                        <Typography type="subtitle2">Новое расписание</Typography>

                        <LessonChipSet
                            lessons={lessons}
                        />
                    </>
                }
            </Layout>
        </Form>
    );
}