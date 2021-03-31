import React from 'react';

import CalendarCard from 'shared/components/calendar-card';

export default function EnrollmentLessons({ enrollment }) {
    const events = enrollment.lessons.map(lesson => ({
        id: lesson.id,
        title: 'Урок',
        icon: 'school',
        date: new Date(lesson.date),
        url: lesson.url
    }));

    return (
        <div className="enrollment-lessons">
            <CalendarCard
                title="Занятия"
                events={events}
            />
        </div >
    );
}