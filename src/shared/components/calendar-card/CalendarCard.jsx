import { useState } from 'react';

import Calendar from 'shared/components/calendar';
import { Button, Flex, Icon, Surface } from 'shared/ui-components';

export default function CalendarCard({
    title,
    events,
    defaultView = 'week'
}) {
    const [view, setView] = useState(defaultView);

    return (
        <Surface className="CalendarCard">
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
        </Surface>
    );
}