import { useCallback } from 'react';

import Calendar from 'shared/components/calendar';
import PageSection from 'shared/components/page-section';

export default function LessonsCalendar({ lessons, onLessonClick }) {
    const handleEventClick = useCallback(event => {
        onLessonClick(event.ref);
    }, [onLessonClick]);

    const events = lessons.map(lesson => {
        const date = new Date(lesson.date);
        const endDate = new Date(lesson.endAt);

        const startTime = {
            hours: date.getHours(),
            minutes: date.getMinutes()
        };
        const endTime = {
            hours: endDate.getHours(),
            minutes: endDate.getMinutes()
        };

        return {
            id: lesson.id,
            ref: lesson,
            title: 'Урок',
            date,
            startTime,
            endTime,
            duration: lesson.duration,
            status: lesson.status,
            icon: lesson.statusIcon
        };
    });

    return (
        <PageSection compact>
            <Calendar
                view="week-time"
                events={events}
                onEventClick={handleEventClick}
            />
        </PageSection>
    );
}