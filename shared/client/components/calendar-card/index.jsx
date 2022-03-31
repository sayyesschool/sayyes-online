import { useState } from 'react';
import {
    Card,
    Icon,
    SegmentedButton
} from '@fluentui/react-northstar';

import Calendar from 'shared/components/calendar';

export default function CalendarCard({ title, events, defaultView = 'week' }) {
    const [view, setView] = useState(defaultView);

    return (
        <Card className="calendar-card">
            <Card.Header
                title={title}
                actions={
                    <SegmentedButton>
                        <SegmentedButton.Segment
                            icon={<Icon>calendar_view_week</Icon>}
                            title="Неделя"
                            selected={view === 'week'}
                            onClick={() => setView('week')}
                        />

                        <SegmentedButton.Segment
                            icon={<Icon>calendar_view_month</Icon>}
                            title="Месяц"
                            selected={view === 'month'}
                            onClick={() => setView('month')}
                        />
                    </SegmentedButton>
                }
            />

            <Calendar
                view={view}
                events={events}
            />
        </Card>
    );
}