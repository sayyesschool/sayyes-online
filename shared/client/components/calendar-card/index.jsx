import { useState } from 'react';
import { Button, Flex, Segment } from '@fluentui/react-northstar';

import Calendar from 'shared/components/calendar';
import Icon from 'shared/components/icon';

export default function CalendarCard({ title, events, defaultView = 'week' }) {
    const [view, setView] = useState(defaultView);

    return (
        <Segment className="calendar-card">
            <Flex>
                {title}

                <Button.Group
                    buttons={[
                        {
                            icon: <Icon>calendar_view_week</Icon>,
                            title: 'Неделя',
                            selected: view === 'week',
                            onClick: () => setView('week')
                        },
                        {
                            icon: <Icon>calendar_view_month</Icon>,
                            title: 'Месяц',
                            selected: view === 'month',
                            onClick: () => setView('month')
                        }
                    ]}
                />
            </Flex>

            <Calendar
                view={view}
                events={events}
            />
        </Segment>
    );
}