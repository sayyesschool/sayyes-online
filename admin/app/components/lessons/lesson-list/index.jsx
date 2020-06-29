import React from 'react';
import { Link } from 'react-router-dom';
import {
    DetailsList
} from '@fluentui/react';

export default function LessonList({ lessons }) {
    const items = lessons
        .map(lesson => ({
            key: lesson.id,
            value: lesson.id,
            title: lesson.title,
            datetime: lesson.datetime,
            student: lesson.student?.fullname,
            teacher: lesson.teacher?.fullname
        }));

    return (
        <section id="lesson-list">
            <DetailsList
                items={items}
                compact={false}
                columns={columns}
                setKey="none"
                isHeaderVisible={true}
            />
        </section>
    );
}

const columns = [
    {
        key: 'title',
        name: 'Название',
        fieldName: 'title',
        data: 'string',
        minWidth: 100,
        maxWidth: 256,
        isRowHeader: true,
        isPadded: true
    },
    {
        key: 'datetime',
        name: 'Дата и время',
        fieldName: 'datetime',
        data: 'string',
        minWidth: 100,
        isRowHeader: true,
        isPadded: true
    },
    {
        key: 'student',
        name: 'Студент',
        fieldName: 'student',
        data: 'string',
        minWidth: 100,
        isRowHeader: true,
        isPadded: true
    },
    {
        key: 'teacher',
        name: 'Преподаватель',
        fieldName: 'teacher',
        data: 'string',
        minWidth: 100,
        isRowHeader: true,
        isPadded: true
    }
];