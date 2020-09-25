import React from 'react';
import { Card } from 'mdc-react';

import Calendar from 'shared/components/calendar';

export default function LessonCalendar({ view, lessons, onView, onEdit, onDelete }) {
    return (
        <Card>
            <Calendar
                view={view}
                events={lessons}
            />
        </Card>
    );
}